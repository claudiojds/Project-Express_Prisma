import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserServices";
import { UserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserController {
    async handle(request: Request, response: Response){
        // Recebendo os atributos de UserRequest 
        const {name, email, password}: UserRequest = request.body;
        
        // Criando uma instacia do serviço de CreateUserService
        const createUserService = new CreateUserService();

        /*os dados "name, email, password" estão vindo do UserRequest
        que tipa os dados que vem do body da requisição*/
        const user = await createUserService.execute({
            name, email, password
        });

        return response.json(user)
    }
};

export { CreateUserController };
