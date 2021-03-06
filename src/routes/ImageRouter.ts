import express from "express"
import ImageController from "../controller/ImageController"

export const imageRouter = express.Router()

imageRouter.post("/create", ImageController.createImage)
imageRouter.get("/all", ImageController.getAllImages)
imageRouter.get("/:id", ImageController.getImageById)
