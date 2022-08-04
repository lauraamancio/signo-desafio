import PollsDatabase from "../data/PollsDatabase";
import { InputPollDTO, PollsModel } from "../models/PollsModel";
import { Authenticator } from "../services/Autheticator";
import { IdGenerator } from "../services/IdGenerator";

export default class PollsBusiness {
    constructor(
        private idGenerator = new IdGenerator,
        private pollsData = new PollsDatabase,
        private authenticator = new Authenticator
    ){}

    public async createPoll(input: InputPollDTO, token: string) {
        try {
            const {title, start_date, end_date} = input

            if(!token){
                throw new Error("Token not found, please check login")
            }

            const validToken = this.authenticator.getData(token)
            if(!validToken.id){
                throw new Error("Invalid token, check login")
            }

            if(!title || !start_date || !end_date) {
                throw new Error("Please fill all fields")
            }
    
            const findTitle = await this.pollsData.findByTitle(title)
            if(findTitle){
                throw new Error("This poll already exists")
            }
            // || end_dateFormat.setUTCHours(0, 0, 0, 0) < Date.now() || end_dateFormat.setUTCHours(0, 0, 0, 0) < start_dateFormat.setUTCHours(0, 0, 0, 0)
            const [dayStart, monthStart, yearStart] = start_date.split("/")
            const start_dateFormat = new Date(`${yearStart}-${monthStart}-${dayStart}`)
            const [dayEnd, monthEnd, yearEnd] = end_date.split("/")
            const end_dateFormat = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`)
    
            if(start_dateFormat.setUTCHours(0, 0, 0, 0) < new Date().setUTCHours(0, 0, 0, 0) || end_dateFormat.setUTCHours(0, 0, 0, 0) < new Date().setUTCHours(0, 0, 0, 0) || end_dateFormat.setUTCHours(0, 0, 0, 0) < start_dateFormat.setUTCHours(0, 0, 0, 0)){
                throw new Error("Invalid date")
            }
    
            const id = this.idGenerator.generate()
    
            const newPoll = new PollsModel(
                id,
                title,
                start_dateFormat,
                end_dateFormat
            )
    
            await this.pollsData.createPoll(newPoll) 
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}