import { HF } from "../middleware/OpenAI.ts";
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
    };

    async sumRev(productId: number): Promise<ISum> {
        const existing = await dBase.query<ISum>(
            `SELECT * FROM summaries
            WHERE product_id=$1 AND expires_at > NOW()`,
            [productId]
        );
        if (existing.rows.length > 0) {
            return existing.rows[0];
        }

        const reviews = await REV.getReviews(productId, 10);
        const joinRev = reviews.map((r) => r.content).join("\n\n");            
        const summary = await REV.summarize(joinRev);

        const result = await dBase.query<ISum>(
            `INSERT INTO summaries
            (product_id, content, expires_at)
            VALUES ($1, $2, NOW() + INTERVAL '7 day')
            ON CONFLICT (product_id) DO UPDATE SET
                content=EXCLUDED.content,
                generated_at=NOW(),
                expires_at=EXCLUDED.expires_at
            RETURNING *`,
            [productId, summary]
        );
        return result.rows[0];
    };

    async summarize(text: string) {
        const output = await HF.summarization({
            model: "facebook/bart-large-cnn",
            inputs: text,
            provider: "hf-inference",
        });
        return output.summary_text;
    };
}

export const REV: RevServiceClass = new RevServiceClass();



