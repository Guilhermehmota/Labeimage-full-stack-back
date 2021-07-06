import { Request, Response } from "express";
import  imageBusiness  from "../business/ImageBusiness";



export class ImageController {
    public async createImage(req: Request, res:Response){
        try {
            
            const token = req.headers.authorization as string

            const {subtitle, file, tags, collection} = req.body

            const input = {
                subtitle,
                file,
                tags,
                collection
            }

            await imageBusiness.createImage(input, token)

            res.status(200).send({message: "Successfully created image"})


        } catch (error) {
            res.status(error.statusCode).send({ error: error.message });
        }
    }
}

export default new ImageController()