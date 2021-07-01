import { UserBusiness } from "../../src/business/UserBusiness";
import userDatabase, { UserDatabase } from "../../src/data/UserDatabase";
import authenticator, { Authenticator } from "../../src/services/Authenticator";
import hashManager, { HashManager } from "../../src/services/HashManager";
import idGenerator, { IdGenerator } from "../../src/services/IdGenerator";


const userBusinessMock = new UserBusiness(
    userDatabase as UserDatabase,
    authenticator as Authenticator,
    idGenerator as IdGenerator,
    hashManager as HashManager,
    )

describe("UserBusiness", () => {

    describe("getUserById", () => {
        test("Should catch error when id is not registered", async () => {
            expect.assertions(2)

            try{
                await userBusinessMock.getUserById("lalala")
            } catch (error) {
                expect(error.statusCode).toBe(404)
                expect(error.message).toBe("User not found")
            }
        })
    })

})