import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, 
    QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App } from "./app/App";

const QC = new QueryClient();

ReactDOM
.createRoot(document.getElementById("root")!)
.render(
    <QueryClientProvider client={QC}>
        <React.Fragment>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </React.Fragment>
    </QueryClientProvider>
);




