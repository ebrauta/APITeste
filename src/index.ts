import express from "express";
import cors from "cors";
import itensRouter from "./routes/itens-router";

const PORT = process.env.PORT || 4000;

const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/api", itensRouter);

app.use((req, res) => {
    res.status(404).send()
});

app.listen(PORT, () =>
  console.info(`Servidor rodando com sucesso em ${HOSTNAME}:${PORT}`)
);
