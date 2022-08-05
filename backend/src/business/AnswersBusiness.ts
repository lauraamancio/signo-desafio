import { AnswerEnum, AnswersModel } from "./../models/AnswersModel";
import AnswersDatabase from "../data/AnswersDatabase";
import UserDatabse from "../data/UsersDatabase";
import { Authenticator, authenticatorData } from "../services/Autheticator";
import PollsDatabase from "../data/PollsDatabase";
import { PollsModel } from "../models/PollsModel";

export default class AnswersBusiness {
    constructor(
        private answersData = new AnswersDatabase,
        private userData = new UserDatabse,
        private authenticator = new Authenticator,
        private pollData = new PollsDatabase
    ){}

    public async registerAnswer(answer: AnswerEnum, poll_id: string, token: string): Promise<void> {
        try {

            if(!token){
                throw new Error("Token not found, please check login")
            }
            const validToken = this.authenticator.getData(token)
            if(!validToken.id){
                throw new Error("Invalid token, check login")
            }

            if(!answer || !poll_id){
                throw new Error("Some parameter is missing")
            }

            const user_id = validToken.id
            const validUser = await this.userData.findByID(user_id)
            if(!validUser){
                throw new Error("User not found, check your login")
            }

            const validPoll: PollsModel = await this.pollData.findByID(poll_id)
            if(!validPoll){
                throw new Error("Poll not found")
            }
            const validPollStartDate: number = validPoll.getStartDate().setUTCHours(0, 0, 0, 0)
            const validPollEndDate: number = validPoll.getEndDate().setUTCHours(0, 0, 0, 0)

            if(validPollEndDate < new Date().setUTCHours(0, 0, 0, 0) || validPollStartDate > new Date().setUTCHours(0, 0, 0, 0)){
                throw new Error("You can't vote in this poll, check the start and end date.")
            }

            if(answer !== AnswerEnum.CONCORDO && answer !== AnswerEnum.CONCORDO_PARCIALMENTE && answer !== AnswerEnum.DISCORDO && answer !== AnswerEnum.SEM_OPINIÃO) {
                throw new Error("Invalid answer format")
            }

            const input = new AnswersModel(
                poll_id,
                user_id,
                answer
            )

            await this.answersData.registerAnswer(input)

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async getVotes(id: string, token: string) {
        try {
            if(!id){
                throw new Error("Please inform a Poll ID")
            }
            if(!token){
                throw new Error("Token not found, check login")
            }
    
            const validPoll = await this.pollData.findByID(id)
            if(!validPoll){
                throw new Error("Poll not found")
            }
    
            const validToken = this.authenticator.getData(token)
            if(!validToken.id){
                throw new Error("Invalid token, check login")
            }
            const result = await this.answersData.getVotes(id)
            return result
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}