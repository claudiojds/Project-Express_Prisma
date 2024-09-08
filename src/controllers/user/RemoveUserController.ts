import { Request, Response } from "express";
import { RemoveUserService } from "../../services/user/RemoveUserService";

class RemoveUserController {

    async hadle (request: Request, response: Response){
        // query: o user_id vira com o query parament com o nome de user_id
        const user_id = request?.query.user_id as string;
        const removeUserService = new RemoveUserService();
        const removeUser = removeUserService.execute({user_id})

        return response.json(removeUser);
    }
}

export {RemoveUserController};