import express from "express";
import { ZodError } from "zod";
import { dBase } from "../data/Database.ts";
import { IRev, IProd } from "../models/Interfaces.ts";
import { ProductIdSchema } from "../models/Schemas.ts";
import { REV as RevSvc } from "../service/ReviewService.ts";

class ReviewClass {
    GetReviews: express.Handler = async (req, res, next) => {
        try {
            const { id: PID } = ProductIdSchema.parse(req.params);

            const product = await dBase.query<IProd>(
                "SELECT id FROM products WHERE id=$1", [PID]);
            if (product.rows.length === 0) {
                return res
                    .status(404)
                    .json({ error: "That Product doesn't exist!" });
            };

            const QRY = `SELECT * FROM reviews
            WHERE product_id=$1 ORDER BY created_at
            DESC LIMIT 10`;
            const summary = await RevSvc.sumRev(PID);
            const reviews = await dBase.query<IRev>(QRY, [PID]);
            if (reviews.rows.length === 0) {
                return res
                    .status(404)
                    .json({
                        error: "No reviews found for this product!"
                    });
            };
            return res
                .status(200)
                .json({
                    success: true,
                    message: "All Reviews Listed!",
                    count: reviews.rows.length,
                    data: {
                        summary,
                        reviews: reviews.rows
                    }
                });
        } catch (error) {
            if (error instanceof ZodError) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: error.issues[0].message
                    });
            }
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error fetching all the Reviews!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };

    SumReviews: express.Handler = async (req, res, next) => {
        try {
            const { id: product_id } = ProductIdSchema.parse(req.params);

            const product = await dBase.query<IProd>(
                "SELECT id FROM products WHERE id=$1",
                [product_id]);
            if (product.rows.length === 0) {
                return res
                    .status(404)
                    .json({ error: "Product doesn't exist!" });
            };

            const reviews = await RevSvc.getReviews(product_id, 1);
            if (reviews.length === 0) {
                return res
                    .status(404)
                    .json({ error: "No reviews found for this product!" });
            };
            const summary = await RevSvc.sumRev(product_id);
            return res
                .status(200)
                .json({
                    success: true,
                    message: "The Summary was created!",
                    data: summary
                });
        } catch (error) {
            if (error instanceof ZodError) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        error: error.issues[0].message
                    });
            }
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error creating the Summary!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            next(error);
        }
    };
};

export const REV: ReviewClass = new ReviewClass();




