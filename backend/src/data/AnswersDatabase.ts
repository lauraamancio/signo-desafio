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

    public async getVotes(poll_id: string) {
        try {
            const result = await this.getConnection()
            .select("answer")
            .count()
            .as("votes")
            .from(this.TABLE_NAME)
            .where({poll_id})
            .groupBy("answer")
            return result
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }
}