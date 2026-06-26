import { z } from "zod";

export const ProductIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Product ID must be numeric")
        .transform(Number)
        .pipe(z.number().int().positive("Product ID must be a positive integer"))
});
