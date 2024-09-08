// Para que o typescrit consiga entender essa linguagem de namespace temos que fazer algumas confirações no arquivo tsconfig.
declare namespace Express {
    export interface Request {
        user_id: string;
    }
}

