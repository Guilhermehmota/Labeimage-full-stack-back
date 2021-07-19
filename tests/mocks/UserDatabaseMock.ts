import { User } from "../../src/model/User";
import { userMock } from "./userMock";


export class UserDatabaseMock {

    public async getUserById(id:string): Promise<User | undefined> {
        if (id === "id_mock"){
            return userMock
        }
        return undefined
    }
}

export default new UserDatabaseMock()