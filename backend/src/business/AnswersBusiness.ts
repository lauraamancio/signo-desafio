import { AnswerEnum, AnswersModel } from "./../models/AnswersModel";
import AnswersDatabase from "../data/AnswersDatabase";
import UserDatabse from "../data/UsersDatabase";
import { Authenticator} from "../services/Autheticator";
import PollsDatabase from "../data/PollsDatabase";
import { PollsModel } from "../models/PollsModel";
import { BaseError } from "../error/BaseError";
import { UserRole } from "../models/UsersModel";

export default class AnswersBusiness {
    constructor(
        private answersData = new AnswersDatabase,
        private userData = new UserDatabse,
        private authenticator = new Authenticator,
        private pollData = new PollsDatabase
    ){}

    public async registerAnswer(answer: AnswerEnum, poll_id: string, token: string): Promise<void> {
        try {
            console.log(answer)
            if(!token){
                throw new BaseError(404, "Token not found, please check login")
            }
            const validToken = this.authenticator.getData(token)
            if(!validToken.id){
                throw new BaseError(400, "Invalid token, check login")
            }

            if(!answer || !poll_id){
                throw new BaseError(422,"Some parameter is missing")
            }

            const user_id = validToken.id
            const validUser = await this.userData.findByID(user_id)
            if(!validUser){
                throw new BaseError(404,"User not found, check your login")
            }

            const validPoll: PollsModel = await this.pollData.findByID(poll_id)
            if(!validPoll){
                throw new BaseError(404, "Poll not found")
            }
            const validPollStartDate: number = validPoll.getStartDate().setUTCHours(0, 0, 0, 0)
            const validPollEndDate: number = validPoll.getEndDate().setUTCHours(0, 0, 0, 0)

            if(validPollEndDate < new Date().setUTCHours(0, 0, 0, 0) || validPollStartDate > new Date().setUTCHours(0, 0, 0, 0)){
                throw new BaseError(400, "You can't vote in this poll, check the start and end date.")
            }

            if(answer !== AnswerEnum.CONCORDO && answer !== AnswerEnum.CONCORDO_PARCIALMENTE && answer !== AnswerEnum.DISCORDO && answer !== AnswerEnum.SEM_OPINIÃO) {
                throw new BaseError(400, "Invalid answer format")
            }

            const input = new AnswersModel(
                poll_id,
                user_id,
                answer
            )

            await this.answersData.registerAnswer(input)

        } catch (error: any) {
            throw new BaseError(400, error.message)
        }
    }

    public async getVotes(id: string, token: string) {
        try {
            if(!id){
                throw new BaseError(422, "Please inform a Poll ID")
            }
            if(!token){
                throw new BaseError(404, "Token not found, check login")
            }
    
            const validPoll = await this.pollData.findByID(id)
            if(!validPoll){
                throw new BaseError(404, "Poll not found")
            }
    
            const validToken = this.authenticator.getData(token)
            if(!validToken.id){
                throw new BaseError(401, "Invalid token, check login")
            }
            const result = await this.answersData.getVotes(id)
            return result
        } catch (error: any) {
            throw new BaseError(400, error.message)
        }
    }

    public async deleteAllAnswers(id: string, token: string) {
        try {
            if (!id || !token) {
              throw new BaseError(422, "Missing id or token");
            }
      
            const validId = await this.pollData.findByID(id);
            if (!validId) {
              throw new BaseError(404, "Poll not found");
            }
      
            const validToken = this.authenticator.getData(token);
            if (!validToken.id) {
              throw new BaseError(401, "Invalid token, please check login");
            }
      
            const user = await this.userData.findByID(validToken.id)
            if(user.getRole() === UserRole.ADMIN){
              await this.answersData.deleteAllAnswers(id);
            }else{
              if(user.getId() !== validId.getCreatorId()) {
                throw new BaseError(403, "You can't delete others Poll")
              }else{
                await this.answersData.deleteAllAnswers(id)
              }
            }
          } catch (error: any) {
            throw new BaseError(400, error.message);
          }
    }
}