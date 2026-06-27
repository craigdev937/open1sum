import React from "react";
import "./App.css";
import Grey from "@public/Grey Zabel3.jpg";

export const App = () => {
    return (
        <React.Fragment>
            <h1>Grey Zabel</h1>
            <img 
                src={Grey} alt="Grey Zabel" 
                height={"600px"} width={"auto"}
            />
        </React.Fragment>
    );
};



