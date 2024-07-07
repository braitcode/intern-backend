import express from "express";
import productRouter from "./src/routes/product.js"
import dotenv from "dotenv"
import { connectDB } from "./src/db.config.js";


dotenv.config()

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL;

// connect to MongoDB
connectDB(dbUrl);

// middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express running....');
});

// routers
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});