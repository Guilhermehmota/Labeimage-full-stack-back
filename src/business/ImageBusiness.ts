import imageDatabase, { ImageDatabase } from "../data/ImageDatabase";
import { CustomError } from "../errors/CustomError";
import { Image, ImageInputDTO } from "../model/Image";
import authenticator, { Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";




export class ImageBusiness {
    constructor(
        private imageDatabase: ImageDatabase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
    ) { }

    public async createImage(image: ImageInputDTO, token: string) {
        try {

            const imageId = this.idGenerator.generate()

            const userAuthorization = this.authenticator.getData(token)

            if (!token) {
                throw new CustomError(400, "você precisa estar logado");
            }

            if (!image.subtitle || !image.file || !image.tags || !image.collection) {
                throw new CustomError(422, "você deve inserir 'titulo', 'link', 'tags' and 'coleção'")
            }

            await this.imageDatabase.createImage(
                new Image(
                    imageId,
                    image.subtitle,
                    userAuthorization.id,
                    new Date(),
                    image.file,
                    image.tags,
                    image.collection
                )
            )


        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getAllImages(token: string) {

        try {
            const images = await this.imageDatabase.getAllImages();
    
            const userAuthorization = this.authenticator.getData(token)
    
            if (!token) {
                throw new CustomError(400, "você precisa estar logado");
            }
            
            if(!userAuthorization) {
                throw new CustomError(400, "email ou senha inválidos");
            }

            if (!images) {
                throw new CustomError(404, "imagem não encontrada")
            }

            return images

        }catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getImageById(id: string, token: string) {

        try {

            const image = await this.imageDatabase.getImageById(id);

            const userAuthorization = this.authenticator.getData(token);

            
            if (!token) {
                throw new CustomError(400, "você precisa estar logado");
            }
            
            if(!userAuthorization) {
                throw new CustomError(400, "email ou senha inválidos");
            }
            
            if (!image) {
                throw new CustomError(404, "imagem não encontrada")
            }
            
            return image

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new ImageBusiness(
    imageDatabase,
    authenticator,
    idGenerator
)