import express from "express";
import conectarBanco from "./src/database/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

conectarBanco();

app.listen(port, () => console.log(`Servidor ativo na porta ${port}`));
