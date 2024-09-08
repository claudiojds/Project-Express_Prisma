import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUseController";
import { IsAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

const router = Router();
router.get("/test", (request: Request, response: Response) => {
  return response.json({ ok: true });
});

// // // métodos post
/*Ao fazer uma requisição post criara uma instância no arquivo CreateUserController que
caira no metodo handle que pegara as informações passadas na requisição acionando o serviço
CreateUserService que vai inserir os dados no banco de dados*/
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);

// categorias
router.post("/category", IsAuthenticated, new CreateCategoryController().handle)

// // // métodos get
//Utilizando um middleware para apenas usuarios logados possam buscar a informação
router.get("/me", IsAuthenticated, new DetailUserController().handle) 

// // // métodos delete
router.delete("/user/remove", new RemoveUserController().hadle)



export { router };
