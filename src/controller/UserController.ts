import { Request, Response } from "express";
import userBusiness from "../business/UserBusiness"

export class UserController {

    public async signup(req: Request, res: Response) {
        try {
            const { name, email, nickname, password } = req.body

            const user = {
                name,
                email,
                nickname,
                password            
            }
            const result = await userBusiness.signup(user);
            res.status(200).send(result);
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = {
                email,
                password
            }
            const result = await userBusiness.login(user);
            res.status(200).send(result);
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await userBusiness.getUserById(id)
            res.status(200)
                .send({
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    nickname: result.nickname
                }
                );
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
        }
    }

}

export default new UserController()