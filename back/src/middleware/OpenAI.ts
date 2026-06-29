import OpenAI from "openai";
import { InferenceClient } from "@huggingface/inference";

export const OC = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const HF = new InferenceClient(process.env.HF_TOKEN);


