import app from "./app.js";
import "./config/db.ts";

const PORT = process.env.PORT || 8801;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});