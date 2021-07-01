import dotenv from "dotenv";
import {Knex} from "knex";
import knex from "knex"

dotenv.config();

export default class BaseDataBase {

    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_NAME,
            port: 3306,
            multipleStatements: true
        },
    });

    public static async destroyConnection(): Promise<void> {
        await BaseDataBase.connection.destroy();
    }
}
