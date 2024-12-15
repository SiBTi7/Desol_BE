import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
}));

app.use(express.json({ limit: '50mb' }));

connectDB();

app.get('/', (req, res) => {
    res.status(200).send("App is running.")
})

app.use("/", userRoutes);
app.use("/", submissionRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
