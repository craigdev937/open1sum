import React from "react";
import "./StarRating.css";
import { FaRegStar, FaStar } from "react-icons/fa";

type VAL = {
    value: number  // Rating from 0 - 5
};

export const StarRating = ({ value }: VAL) => {
    const hold = [1, 2, 3, 4, 5];

    return (
        <React.Fragment>
            <section className="star">
                {hold.map((pla) => (
                    (pla) <= value ? 
                        <FaStar key={pla} color="yellow" /> : 
                        <FaRegStar key={pla} color="yellow" />
                ))}
            </section>
        </React.Fragment>
    );
};


