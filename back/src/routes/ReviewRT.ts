import express from "express";
import { REV } from "../controllers/ReviewCTR.ts";

// Route:  localhost:9000/api/products/1/reviews
export const reviewRt: express.Router = express.Router();
    reviewRt.get("/products/:id/reviews", REV.GetReviews);
    reviewRt.post("/products/:id/reviews/summarize", REV.SumReviews);





    
