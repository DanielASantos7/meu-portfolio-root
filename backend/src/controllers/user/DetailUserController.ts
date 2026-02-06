import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserervice";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const detailUserService = new DetailUserService();

    const userDetail = await detailUserService.execute(userId);

    return res.json(userDetail);
  }
}

export { DetailUserController };
