import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUseController";
import { IsAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { SaleProductController } from "./controllers/sale/SaleProductController";

const router = Router();
//configurando o upload de imagens
const upload = multer(uploadConfig.upload("./tmp")); //tmp: criara uma pasta fora de src para armesenar as imagens

router.get("/test", (request: Request, response: Response) => {
  return response.json({ ok: true });
});

// Usuario
/*Ao fazer uma requisição post criara uma instância no arquivo CreateUserController que
caira no metodo handle que pegara as informações passadas na requisição acionando o serviço
CreateUserService que vai inserir os dados no banco de dados*/
router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
//Utilizando um middleware para apenas usuarios logados possam buscar a informação
router.get("/me", IsAuthenticated, new DetailUserController().handle);
router.delete("/user/remove", new RemoveUserController().hadle);


// Categorias
router.get("/category/all", IsAuthenticated, new ListCategoryController().handle);
router.post("/category", IsAuthenticated, new CreateCategoryController().handle);
router.put("/category/edit", IsAuthenticated, new EditCategoryController().handle);
router.delete("/category/remove", IsAuthenticated, new RemoveCategoryController().hadle);

//Products
// upload.single("file"): configuração do milter para upload das imagens
router.post("/product", IsAuthenticated, upload.single("file"), new CreateProductController().handle);
router.put("/product/edit", IsAuthenticated, upload.single("file"), new EditProductController().handle);
router.get("/product/category", IsAuthenticated, new ListProductByCategoryController().handle);
router.get("/product/list", IsAuthenticated, new ListProductController().handle);
router.delete("/product/remove", IsAuthenticated, new RemoveProductController().handle);

//  Sale (vendas)
router.put("/sale/product", IsAuthenticated, new SaleProductController().handle); //efetuando venda



///////////////////////////////
export { router };
