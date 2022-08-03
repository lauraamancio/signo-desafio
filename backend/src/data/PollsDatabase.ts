import { PollsModel } from "./../models/PollsModel";
import { BaseDatabase } from "./BaseDatabase";

export default class PollsDatabase extends BaseDatabase {
    protected TABLE_NAME = "polls_signo"

    public async createPoll(input: PollsModel): Promise<void> {
        try {
            await this.getConnection()
            .insert(input)
            .into(this.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }

    public async findByTitle(title: string): Promise<PollsModel> {
        try {
            const result: PollsModel[] = await this.getConnection()
            .select()
            .from(this.TABLE_NAME)
            .where({title})
            return result[0] && PollsModel.todoUserModel(result[0])
        } catch (error: any) {
            throw new Error(error.sqlmessage || error.message)
        }
    }
}