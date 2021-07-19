import express from "express";
import { userRouter } from "./routes/UserRouter";
import { AddressInfo } from "net";
import { imageRouter } from "./routes/ImageRouter";


const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/images", imageRouter);



const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});