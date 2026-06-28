import React from "react";
import "./ReviewList.css";
import { useQuery } from "@tanstack/react-query";
import { HiSparkles } from "react-icons/hi2";
import { IAll } from "../../models/Interfaces";
import { StarRating } from "../Star/StarRating";
const URL = "http://localhost:9000/api/products";
const SUM = "reviews/summarize";
import { Spinner } from "../spin/Spinner";

interface PRO {
    productId: number
}; 

type SS = {
    summary: string
};

export const ReviewList = ({ productId }: PRO) => {
    const [summary, setSummary] = React.useState("");

    const handleSum = async () => {
        const res = await fetch(`${URL}/${productId}/${SUM}`);
        if (!res.ok) throw new Error(res.statusText);
        const data: SS = await res.json();
        setSummary(data.summary)
        return data;
    };

    const { isLoading, error, data: revData } = useQuery<IAll>({
        queryKey: ["reviews", productId],
        queryFn: () => fetchReviews()
    });

    const fetchReviews = async () => {
        const res = await fetch(`${URL}/${productId}/reviews`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        return data.data;
    };

    if (isLoading) {
        return <Spinner />;
    };

    if (error) {
        return <h1 className="error">{error.message}</h1>;
    };

    if(!revData?.reviews.length) {
        return null;
    };

    const curSum = revData.summary?.content || summary;

    return (
        <React.Fragment>
            <main>
                <aside>
                    {curSum ? (
                        <p>{curSum}</p>
                    ) : (
                        <button onClick={handleSum}>
                            <HiSparkles />
                            Summarize
                        </button>
                    )}
                </aside>
                {revData?.reviews?.map((rev) => (
                    <section key={rev.id} className="rev">
                        <section>
                            <aside className="rev__author">
                                {rev.author}
                            </aside>
                            <aside>
                                Rating: 
                                    <StarRating 
                                        value={rev.rating} 
                                    />
                            </aside>
                            <p>{rev.content}</p>
                        </section>
                    </section>
                ))}
            </main>
        </React.Fragment>
    );
};


