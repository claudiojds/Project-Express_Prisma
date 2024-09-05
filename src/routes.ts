import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUseController";

const router = Router();
router.get("/test", (request: Request, response: Response) => {
  return response.json({ ok: true });
});

//User Routes
/*Ao fazer uma requisição post criara uma instância no arquivo CreateUserController que
caira no metodo handle que pegara as informações passadas na requisição acionando o serviço
CreateUserService que vai inserir os dados no banco de dados*/
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle) 

export { router };
