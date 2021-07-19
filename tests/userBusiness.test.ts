import { UserBusiness } from "../src/business/UserBusiness";
import { UserDatabase } from "../src/data/UserDatabase";
import authenticatorMock from "./mocks/authenticatorMock";
import hashManagerMock from "./mocks/hashManagerMock";
import idGeneratorMock from "./mocks/idGeneratorMock";
import userDatabaseMock from "./mocks/userDatabaseMock"



const userBusinessMock = new UserBusiness(
    userDatabaseMock as UserDatabase,
    authenticatorMock,
    idGeneratorMock,
    hashManagerMock
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