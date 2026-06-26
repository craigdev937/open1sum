import { client } from "../middleware/OpenAI.ts";
import { dBase } from "../data/Database.ts";
import { IRev, ISum } from "../models/Interfaces.ts";

class RevServiceClass {
    async getReviews(productId: number, limit = 10): Promise<IRev[]> {
        const reviews = await dBase.query<IRev>(
            `SELECT * FROM reviews
            WHERE product_id=$1
            ORDER BY created_at DESC
            LIMIT $2`,
            [productId, limit]
        );
        return reviews.rows;
    }

    async sumRev(productId: number): Promise<ISum> {
        const existing = await dBase.query<ISum>(
            `SELECT * FROM summaries
            WHERE product_id=$1 AND expires_at > NOW()`,
            [productId]
        );
        if (existing.rows.length > 0) {
            return existing.rows[0];
        }

        const reviews = await this.getReviews(productId, 10);
        const joinRev = reviews.map((r) => r.content).join("\n\n");
        const prompt = `Summarize the following customer
            reviews into a short paragraph highlighting
            key themes, both positive and negative:
            ${joinRev}`;
        const response = await client.responses.create({
            model: "gpt-5.4-nano-2026-03-17",
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 300
        });

        const result = await dBase.query<ISum>(
            `INSERT INTO summaries
            (product_id, content, expires_at)
            VALUES ($1, $2, NOW() + INTERVAL '7 day')
            ON CONFLICT (product_id) DO UPDATE SET
                content=EXCLUDED.content,
                generated_at=NOW(),
                expires_at=EXCLUDED.expires_at
            RETURNING *`,
            [productId, response.output_text]
        );
        return result.rows[0];
    }
}

export const REV: RevServiceClass = new RevServiceClass();



