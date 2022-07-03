import db from "./conn.js";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/index.js";
import cron from "node-cron";
import {
  updateCummilativeDataInternal,
  createDay,
} from "./controllers/Products.js";
const app = express();

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(cors());
app.use(express.json());
app.use("/", productRoutes);

cron.schedule("0 0 1 * * *", () => {
  let prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);
  let prevDateStr = prevDate
    .toLocaleString("fr-CA", { timeZone: "Asia/Kolkata" })
    .split(",")[0]; //toISOString().split('T')[0];
  console.log(prevDateStr);
  updateCummilativeDataInternal(prevDateStr);
});

cron.schedule("0 0 22 * * *", () => {
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  let nextDateStr = nextDate
    .toLocaleString("fr-CA", { timeZone: "Asia/Kolkata" })
    .split(",")[0]; //toISOString().split('T')[0];
  console.log(nextDateStr);
  createDay(nextDateStr);
});

//cron.schedule("0 0 22 * * *", updateCummilativeDataInternal);
cron.schedule("0 0 1 * * *", () => {});

app.listen(5002, () => {
  console.log("Running on PORT 5002");
});
