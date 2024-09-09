import { Request, Response } from "express";
import {ListProductService} from "../../services/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response){
        const listProduct = new ListProductService();
        const products = await listProduct.execute();

        return response.json(products);
    }
}

export {ListProductController};