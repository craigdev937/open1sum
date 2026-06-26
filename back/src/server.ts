import { app } from "./app.ts";

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
    console.log("Press Ctrl + C to exit.");
});



