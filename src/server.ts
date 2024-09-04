import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes"; // importando o arquivo de rotas
import "express-async-errors";

const app = express();
const port = 3333;
app.use(express.json());
app.use(router);

// configurando as respostas de erro do "express-async-errors"
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // se error for 400 retorne erro se nao retorne mensagem "Error 500"
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Erro 500: Internal server error",
    });
  }
);

app.listen(port, () => {
  console.log("Servidor rodando na porta 3333, Projeto Controle de Estoque!");
});
