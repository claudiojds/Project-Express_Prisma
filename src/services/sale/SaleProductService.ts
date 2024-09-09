import prismaClient from "../../prisma";
import { SaleProductRequest } from "../../models/interfaces/sale/SaleProductRequest";
import { response } from "express";

class SaleProductService {
    async execute ({product_id, amount}: SaleProductRequest){
        if(!product_id || !amount){
           throw new Error("Dados de entrada não foram passados corretamente!");         
        }

        const queryProduct = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
        });

        // Se a propriedade amount seja mair que o amount no banco de dados
        // ?: verifica se a propriedade a direita(queryProduct) exita ou não
        if (queryProduct?.amount > amount && amount > 0) {
            const newAmount =  (queryProduct?.amount - amount) 
            const saveSale = await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    amount: newAmount
                },
                select: {
                  id: true,
                  name: true,
                  amount: true  
                }
            });
            
            return saveSale;
        } else {
            throw new Error("Não foi pssivel efetuar a venda!")
        }
    }
}

export {SaleProductService}