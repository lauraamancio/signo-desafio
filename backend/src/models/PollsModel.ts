export interface InputPollDTO {
    title: string,
    start_date: string,
    end_date: string
}

export interface InputEditPollDTO {
    title?: string,
    start_date?: string,
    end_date?: string
}
export interface InputEditPollBDDTO {
    title?: string,
    start_date?: Date,
    end_date?: Date
}

export class PollsModel {
    constructor(
        private id: string,
        private title: string,
        private start_date: Date,
        private end_date: Date
    ){}

    public getId() {
        return this.id
    }
    public getTitle() {
        return this.title
    }
    public getStartDate() {
        return this.start_date
    }
    public getEndDate() {
        return this.end_date
    }

    static todoUserModel(poll: any): PollsModel {
        return new PollsModel(poll.id, poll.title, poll.start_date, poll.end_date)
    } 
}