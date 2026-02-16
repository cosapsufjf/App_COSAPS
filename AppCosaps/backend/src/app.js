import express from "express";
import UserRoutes from "./routes/UserRoutes.ts";
import cors from "cors";

const app = express();
app.use(cors(
    {
        origin: "http://10.0.2.2:3000",
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cadastrar",UserRoutes);
app.use("/login",UserRoutes);
app.use("/alterar_senha",UserRoutes);

app.use((err,req,res,next) => {
    if(err instanceof Error)
        return res.status(400).json({error: err.message});
    return res.status(500).json({error:"Erro interno do servidor"});
});

export default app;