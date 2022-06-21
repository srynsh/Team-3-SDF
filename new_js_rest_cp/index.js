import db from './conn.js';
import express from "express";
import cors from "cors";
import productRoutes from "./routes/index.js";
const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use('/', productRoutes);

app.listen(5001, () => { console.log('Running on PORT 5001') });