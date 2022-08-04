import { Request, Response } from "express";
import AnswersBusiness from "../business/AnswersBusiness";

export class AnswersController {
    constructor(
        private answerBusiness = new AnswersBusiness
    ){}

    public registerAnswer = async(req: Request, res: Response) => {
        try {
            const {answer} = req.body
            const user_id = req.params.user_id
            const poll_id = req.params.poll_id
            const token = req.headers.authorization as string
            
            await this.answerBusiness.registerAnswer(answer, user_id, poll_id, token)
            res.status(201).send({message: "vote registered"})
        } catch (error: any) {
            res.send(error.message)
        }
    }
}