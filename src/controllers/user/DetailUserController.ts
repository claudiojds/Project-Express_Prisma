import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {

        async handle(request: Request, responde: Response) {
            const user_id = request?.user_id;
            const detailUserService =  new DetailUserService();
            const user = await detailUserService.execute(user_id);

            return responde.json(user)
        }
}

export {DetailUserController}