import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { delayMiddleware } from "./middlewares/delay.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use(delayMiddleware);

app.use("/api", routes);

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
