import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import cartRoute from "./routes/cartRoute";
import categoryRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import shopRoute from "./routes/shopRoute";
import orderRoute from "./routes/orderRoute";
import errorMiddleware from "./middlewares/errorMiddleware";
import limiter from "./middlewares/limiterMiddleware";
import helmet from "helmet";
import xssClean from "xss-clean";
import sanitizeMiddleware from "./middlewares/sanitizeMiddleware";
import { setupSwagger } from "./config/swagger";
import { logger } from "./utils/logger";

const app = express();
setupSwagger(app);

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(xssClean());
app.use(sanitizeMiddleware);
app.use(express.json());
// app.use(limiter);
app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/shop", shopRoute);
app.use("/api/order", orderRoute);

// Error Handling Middleware
app.use(errorMiddleware);

// Route dengan error handling
app.get('/error', (req, res) => {
  try {
    throw new Error('Simulated error');
  } catch (err) {
    logger.error('Error occurred', { error: err });
    res.status(500).send('Internal Server Error');
  }
});

app.get("/", (req: Request, res: Response) => {
  res.status(403).json({ errors: "Forbidden" });
});

export default app;