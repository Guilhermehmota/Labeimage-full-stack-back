import userDatabase, { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
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

    public async signup(
        name: string,
        email: string,
        nickname: string,
        password: string
    ) {
        try {
            if (!name || !email || !nickname || !password) {
                throw new CustomError(422, "Missing input");
            }

            if (email.indexOf("@") === -1) {
                throw new CustomError(422, "Invalid email");
            }

            if (password.length < 6) {
                throw new CustomError(422, "Invalid password");
            }

            const id = this.idGenerator.generate();

            const cypherPassword = await this.hashManager.hash(password);

            await this.userDatabase.createUser(id, name, email, nickname, cypherPassword);

            const accessToken = this.authenticator.generateToken({ id });

            return { accessToken };

        } catch (error) {
            if (error.message.includes("key 'email' ")) {
                throw new CustomError(409, "Email already in use")
            }

            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async login(email: string, password: string) {

        try {
            if (!email || !password) {
                throw new CustomError(422, "Missing input");
            }

            const user = await this.userDatabase.getUserByEmail(email);

            if (!user) {
                throw new CustomError(401, "Invalid credentials");
            }

            const isPasswordCorrect = await this.hashManager.compare(
                password,
                user.getPassword()
            );

            if (!isPasswordCorrect) {
                throw new CustomError(401, "Invalid credentials");
            }

            const accessToken = this.authenticator.generateToken({
                id: user.getId()
            });

            return { accessToken };
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getUserById(id: string) {

        const user = await this.userDatabase.getUserById(id);

        if (!user) {
            throw new CustomError(404, "User not found")
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