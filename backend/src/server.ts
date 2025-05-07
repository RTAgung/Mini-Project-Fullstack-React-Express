import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { delayMiddleware } from "./middlewares/delay.middleware.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(delayMiddleware);

app.use("/api", routes);

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
