import express, { Request, Response } from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import cartRoute from "./routes/cartRoute";
import categoryRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import shopRoute from "./routes/shopRoute";
import orderRoute from "./routes/orderRoute";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import errorMiddleware from "./middlewares/errorMiddleware";
import limiter from "./middlewares/limiter";
import helmet from "helmet";
import xssClean from "xss-clean";
import sanitizeMiddleware from "./middlewares/sanitizeMiddleware";
import { setupSwagger } from "./config/swagger";

const app = express();
setupSwagger(app);

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(xssClean());
app.use(sanitizeMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(limiter);
app.use(helmet());

// Routes
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/shop", shopRoute);
app.use("/api/order", orderRoute);

// Error Handling Middleware
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.status(403).json({ errors: "Forbidden" });
});

export default app;