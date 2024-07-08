import express from "express";
import productRouter from "./src/routes/product.js"
import dotenv from "dotenv"
import { connectDB } from "./src/db.config.js";
import cors from "cors"


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URL;

// Connect to MongoDB
connectDB(dbUrl);

// middleware
app.use(express.json());

// cors
let corsOptions = { 
  origin : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'], 
} 
app.use(cors(corsOptions));



// routers
app.use("/api/product", productRouter);

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`)
})