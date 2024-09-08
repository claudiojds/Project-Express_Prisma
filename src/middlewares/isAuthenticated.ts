// middleware responsavel por permitir que apenas usuarios logados acessaem algumas rotas.

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../models/interfaces/user/Payloads";

export function IsAuthenticated(request: Request, response: Response, next: NextFunction){
    //acessar token JWT
    const authToken = request.headers.authorization;

    // se não tiver o token
    if (!authToken){
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // validar token
        const {sub} = verify(token, process.env.JWT_SECRET) as Payload
        request.user_id = sub;

        // next deixa que a requisição prosiga não barra a aplicação
        return next()
        
    } catch (error) {
       return response.send(401).end();
    }
}