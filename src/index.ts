import express from "express";
import dotenv from "dotenv";
//middlewares
import { corsMiddleware } from "@/middlewares/cors";
import { limiter } from "@/middlewares/reteLimit";
//routes
import { authRoutes } from "@/routers/authRoutes";

import { timeslotsRoutes } from "@/routers/timeslotsRoutes";
import { usersRoutes } from "@/routers/usersRoutes";
import { reservationsRoutes } from "@/routers/reservationsRoutes";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Apply middleware
app.use(corsMiddleware());
app.use(express.json());
app.use(limiter);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/timeslots", timeslotsRoutes);
app.use("/api/reservations", reservationsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
