import express from "express";
import { userRouter } from "./routes/UserRouter";
import { AddressInfo } from "net";
import { imageRouter } from "./routes/ImageRouter";
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());

app.use("/users", userRouter);
app.use("/images", imageRouter);



const PORT = process.env.PORT || 3004;
const server = app.listen(PORT, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});