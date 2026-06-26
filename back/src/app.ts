import "dotenv/config";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { ERR } from "./middleware/midError.ts";
import { reviewRt } from "./routes/ReviewRT.ts";

export const app: express.Application = express();
app.use(helmet());

// CORS Setup
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 
            "POST, GET, PUT, PATCH, DELETE");
        return res
            .status(res.statusCode)
            .json({ "status message": "OK" });
    };
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use("/api", reviewRt);
app.use(ERR.notFound);
app.use(ERR.errHandler);



