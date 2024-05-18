import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors';
import morgan from 'morgan'
import  connectDB  from './config/db.js';
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import cors from "cors"

//configure env
dotenv.config();

//databse config
connectDB();

const app = express();

app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB or set to an appropriate value
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//rest object
app.use(express.json());
app.use(morgan("dev"));

//middelweres
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//PORT
const PORT = process.env.PORT || 7080;

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Ecommerce App</h1>");
});

//server listen
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });