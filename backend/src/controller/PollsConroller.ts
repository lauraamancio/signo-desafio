import { Request, Response } from "express";
import PollsBusiness from "../business/PollsBusiness";
import { InputPollDTO } from "../models/PollsModel";

export default class PollsController {
  constructor(private pollsBusiness = new PollsBusiness()) {}

  public createPoll = async (req: Request, res: Response) => {
    try {
      const { title, start_date, end_date } = req.body
      const token = req.headers.authorization as string

      const input: InputPollDTO = {
        title,
        start_date,
        end_date,
      }

      await this.pollsBusiness.createPoll(input, token);
      res.status(200).send({ message: `Poll ${title} created!` });
    }catch (error: any) {
      res.send(error.message)
    }
  }
}
