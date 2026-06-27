import React from "react";
import "./App.css";
import { ReviewList } from "../components/List/ReviewList";

export const App = () => {
    return (
        <React.Fragment>
            <ReviewList productId={1} />
        </React.Fragment>
    );
};



