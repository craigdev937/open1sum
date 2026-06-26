import { describe, expect, it } from "@rstest/core";
import request from "supertest";
import { app } from "../app.ts";

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const response = await request(app)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).toEqual({
            success: true,
            status: "Hello World!",
            OPENAI: process.env.OPENAI_API_KEY
        });
    });
});




