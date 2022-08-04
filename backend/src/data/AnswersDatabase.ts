import { AnswerEnum } from "./../models/AnswersModel";
import { AnswersModel } from "../models/AnswersModel";
import { BaseDatabase } from "./BaseDatabase";

export default class AnswersDatabase extends BaseDatabase {
    protected TABLE_NAME = "answers_polls_signo"

    public async registerAnswer(input: AnswersModel): Promise<void> {
        try {
            await this.getConnection()
            .insert(input)
            .into(this.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async getVotes(answer: AnswerEnum) {
        try {
            const result = await this.getConnection()
            .select()
            .count(answer)
            .from(this.TABLE_NAME)
            .groupBy("answer")
            return result[0]
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }
}