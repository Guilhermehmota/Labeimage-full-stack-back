import userDatabase, { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { LoginInputDTO, User, UserInputDTO } from "../model/User";
import authenticator, { Authenticator } from "../services/Authenticator";
import hashManager, { HashManager } from "../services/HashManager";
import idGenerator, { IdGenerator } from "../services/IdGenerator";



export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,

    ) { }

    public async signup(user: UserInputDTO) {
        try {
            if (!user.name || !user.email || !user.nickname || !user.password) {
                throw new CustomError(422, "todos os campos devem ser preenchidos");
            }

            if (user.email.indexOf("@") === -1) {
                throw new CustomError(422, "digite um email válido");
            }

            if (user.password.length < 6) {
                throw new CustomError(422, "a senha deve conter no mínimo 6 caracteres");
            }

            const id = this.idGenerator.generate();

            const cypherPassword = await this.hashManager.hash(user.password);

            await this.userDatabase.createUser(
                new User (
                    id, 
                    user.name, 
                    user.email, 
                    user.nickname, 
                    cypherPassword 
                )
            );

            const accessToken = this.authenticator.generateToken({ id });

            return { accessToken };

        } catch (error) {
            if (error.message.includes("key 'email' ")) {
                throw new CustomError(409, "este email já está em uso")
            }

            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async login( user: LoginInputDTO) {

        try {
            if (!user.email || !user.password) {
                throw new CustomError(422, "todos os campos deve ser preenchidos");
            }

            const authorizedUser = await this.userDatabase.getUserByEmail(user.email);

            if (!authorizedUser) {
                throw new CustomError(401, "email ou senha inválidos");
            }

            const isPasswordCorrect = await this.hashManager.compare(
                user.password,
                authorizedUser.getPassword()
            );

            if (!isPasswordCorrect) {
                throw new CustomError(401, "senha inválida");
            }

            const accessToken = this.authenticator.generateToken({
                id: authorizedUser.getId()
            });

            return { accessToken };
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getUserById(id: string) {

        const user = await this.userDatabase.getUserById(id);

        if (!user) {
            throw new CustomError(404, "este usuário não existe")
        }

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            nickname: user.getNickname()
        };
    }
}

export default new UserBusiness(
    userDatabase,
    authenticator,
    idGenerator,
    hashManager
)