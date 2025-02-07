import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  
  res.status(err.status || 500).json({
    errors: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;