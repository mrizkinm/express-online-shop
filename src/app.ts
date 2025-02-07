import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import { limiter } from "./middlewares/limiter";
import helmet from "helmet";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(limiter);
app.use(helmet());

// Routes
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

export default app;