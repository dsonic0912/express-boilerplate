import { type Request, type Response, type NextFunction } from "express";

export const helloWorld = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Hello World Again!",
  });
};
