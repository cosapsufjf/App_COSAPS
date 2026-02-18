import express from "express";
import UserRoutes from "./routes/UserRoutes.ts";
import cors from "cors";

const app = express();
// app.use(cors(
//     {
//         origin: "http://localhost:8801",//"http://10.0.2.2:8801",
//         credentials: true,
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization']
//     }
// ));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRoutes);

app.use((err,req,res,next) => {
    if(err instanceof Error)
        return res.status(400).json({error: err.message});

    return res.status(500).json({error:"Erro interno do servidor"});
});

export default app;