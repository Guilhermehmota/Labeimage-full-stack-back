import { Image } from "../model/Image";
import { BaseDatabase } from "./BaseDatabase";


export class ImageDatabase extends BaseDatabase {

    private toModel(dbModel?: any): Image | undefined {
        return (
            dbModel && 
            new Image (
                dbModel.id,
                dbModel.subtitle,
                dbModel.author,
                dbModel.date,
                dbModel.file,
                dbModel.tags,
                dbModel.collection
            )
        );
    }

    private static TABLE_NAME = "LABEIMAGE_IMAGES";

    public async createImage(image: Image): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: image.getId(),
                    subtitle: image.getSubtitle(),
                    author: image.getAuthor(),
                    date: image.getDate(),
                    file: image.getFile(),
                    tags: image.getTags(),
                    collection: image.getCollection(),
                })
                .into(ImageDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error (error.sqlMessage || error.message);
        }
    }

    public async getAllImages(): Promise<any> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(ImageDatabase.TABLE_NAME)

            return result
        } catch (error) {
            throw new Error (error.sqlMessage || error.message);
        }
    }

    public async getImageById(id: string): Promise<Image> {
        try {
            const result = await this.getConnection() 
            .select("*")
            .from(ImageDatabase.TABLE_NAME)
            .where({id})

            return result[0]
        } catch (error) {
            throw new Error (error.sqlMessage || error.message);
        }
    }

}

export default new ImageDatabase()