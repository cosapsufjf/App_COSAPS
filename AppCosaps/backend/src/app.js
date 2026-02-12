import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(cors(
    {
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

app.use(express.json());
app.use(routes);

export default app;