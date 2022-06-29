import db from './conn.js';
import express from "express";
import cors from "cors";
import productRoutes from "./routes/index.js";
import cron from "node-cron";
import { updateCummilativeDataInternal } from "./controllers/Products.js";
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

// cron.schedule("*/10 * * * * *", () => {
//     let prevDate = new Date();
//     prevDate.setDate(prevDate.getDate() - 1);
//     let prevDateStr = prevDate.toLocaleString("fr-CA", { timeZone: 'Asia/Kolkata' }).split(',')[0];//toISOString().split('T')[0];
//     console.log(prevDateStr);
//     updateCummilativeDataInternal(prevDateStr);
// });

app.listen(5002, () => { console.log('Running on PORT 5002') });
