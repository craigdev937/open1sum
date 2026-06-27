import React from "react";
import "./ReviewList.css";
import { IAll } from "../../models/Interfaces";
const URL = "http://localhost:9000/api/products";

interface PRO {
    productId: number
}; 

export const ReviewList = ({ productId }: PRO) => {
    const [revData, setRevData] = React.useState<IAll>();

    const fetchReviews = async () => {
        const res = await fetch(`${URL}/${productId}/reviews`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json()
        setRevData(data.data);
    };

    React.useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <React.Fragment>
            {revData?.reviews?.map((rev) => (
                <main key={rev.id} className="rev">
                    <section>
                        <aside className="rev__author">{rev.author}</aside>
                        <aside>Rating: {rev.rating}/5</aside>
                        <p>{rev.content}</p>
                    </section>
                </main>
            ))}
        </React.Fragment>
    );
};


