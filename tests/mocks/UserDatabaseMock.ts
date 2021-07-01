import { User } from "../../src/model/User";
import { userMock } from "../UserMock";


export class UserDatabase {

    public async getUserById(id:string): Promise<User | undefined> {
        if (id === "id_user"){
            return userMock
        }
        return undefined
    }
}

export default new UserDatabase()