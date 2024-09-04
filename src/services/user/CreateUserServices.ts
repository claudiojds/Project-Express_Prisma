import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        // se o email for vazio
        if(!email){
            throw new Error("Email incorreto")
        }

        // Verificando se o usuario existe
        // prismaClient.user.findFirst: procurar o primeiro dado que coinsidir com o email passado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        // verifica se o mail já está sendo usado 
        if(userAlreadyExists){
            throw new Error("Este email já existe")
        }

        //Encripitando a senha do usuario
        // hash: recebe o password do UserRequest e o legth(tamanho)
        const passwordHash = await hash(password, 8);

        //criando usuario
        // user vem da instacia prismaClient criada 
        const user = prismaClient.user.create({
            // data: usados para criar o usuario
            data: {
                name: name,
                email: email,
                password: passwordHash // passando a senha incriptada
            },
            // select: exibira a mensagem de retorno apos ter criado o usuario
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService };
