import { User } from "../model/User";
import BaseDataBase from "./BaseDatabase";


export class UserDatabase extends BaseDataBase {

    protected tableName: string = "PFS_USERS";

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

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDataBase.connection.raw(`
                INSERT INTO ${this.tableName} (id, name, email, nickname, password)
                VALUES (
                    '${user.getId()}',
                    '${user.getName()}',
                    '${user.getEmail()}',
                    '${user.getNickname()}',
                    '${user.getPassword()}'
                )
            `);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const result = await BaseDataBase.connection.raw(`
              SELECT * from ${this.tableName} WHERE email = '${email}'
            `);
            return this.toModel(result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getUserById(id: string): Promise<User | undefined> {
        try {
            const result = await BaseDataBase.connection.raw(`
              SELECT * from ${this.tableName} WHERE id = '${id}'
            `);
            return this.toModel(result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}

export default new UserDatabase()