import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const port = process.env.PORT || 8000;
connectToDatabase()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
})
    .catch((err) => console.log(err));
