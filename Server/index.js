import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import transactionRoutes from "./routes/Transaction.js";


// Initialize Express application
export const app = express();

// Set up CORS middleware
app.use(cors());

// Load environment variables from .env file
config({ path: "./.env" });

// Set up middlewares for request parsing and cookie handling
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON payloads

app.use('/api/transactions', transactionRoutes);
// Set up error handling middleware
app.use(errorMiddleware);
