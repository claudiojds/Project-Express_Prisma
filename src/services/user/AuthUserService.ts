import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { AuthRequest } from "../../models/interfaces/auth/AuthRequest";

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // verificando se o usuario digitou o email
    if (!email) {
      throw new Error("Digite seu email!");
    }
    // verificando se o usuario digitou o password
    if (!password) {
      throw new Error("Digite seu email!");
    }

    //verificar no banco de dados se existe um usuario com email passado
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    // caso não tenha email cadastrado ou usuario digitou email ou senha errados
    if (!user) {
      throw new Error("Usuario ou senha errado, tente novamente!");
    }
    // verificando se a senha está correta
    const passwordWatch = await compare(password, user?.password);

    if (!passwordWatch) {
      throw new Error("Senha errada!");
    }

    // verificando tokem de criptografia da senha
    const token = sign(
      // 1º Dados que seram validados
      {
        name: user?.name,
        email: user?.email,
      },
      // 2º parametro: chave secret
      process.env.JWT_SECRET as string, //passando o desincriptador do arquivo .env
      // 3º 
      {
        subject: user?.id,
        expiresIn: "30d", //apos 30 dias terar que fazer login novamente.
      }
    );

    return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        token: token
    }
  }
}

export { AuthUserService };
