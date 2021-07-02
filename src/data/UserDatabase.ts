import { User } from "../model/User";
import {BaseDatabase} from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

    private toModel(dbModel?: any): User | undefined {
        return (
            dbModel &&
            new User(
                dbModel.id,
                dbModel.name,
                dbModel.email,
                dbModel.nickname,
                dbModel.password,
            )
        );
    }

    private static TABLE_NAME = "PFS_USERS";

    public async createUser(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    email,
                    name,
                    nickname,
                    password,
                })
                .into(UserDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserByEmail(email: string): Promise<User> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

        return User.toUserModel(result[0]);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id })                 
        
        return this.toModel(result[0])
    }

}

export default new UserDatabase()