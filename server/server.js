import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Create Express app
const app = express();

app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB or set to an appropriate value
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middlewares
app.use(cors());
app.use(morgan("dev"));

// Derive __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Catch-all handler to send back React's index.html file for any other requests
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Define PORT
const PORT = process.env.PORT || 7080;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
