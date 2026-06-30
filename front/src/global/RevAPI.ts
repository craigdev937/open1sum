import { ISum, IAll } from "../models/Interfaces";
const URL = "http://localhost:9000/api/products";
const SUM = "reviews/summarize";

class RevClass {
    Rev = async (PID: number): Promise<IAll> => {
        const res = await fetch(`${URL}/${PID}/reviews`);
        if (!res.ok) throw new Error(res.statusText);
        const data: IAll = await res.json();
        console.log(data);
        return data;
    };

    Sum = async (PID: number): Promise<ISum> => {
        const res = await fetch(`${URL}/${PID}/${SUM}`);
        if (!res.ok) throw new Error(res.statusText);
        const data: ISum = await res.json();
        console.log(data);
        return data;
    };
};

export const API: RevClass = new RevClass();



