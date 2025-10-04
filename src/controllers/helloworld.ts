import { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";

const helloWorldSchema = z.object({
  name: z.string(),
});

export const helloWorld = (req: Request, res: Response) => {
  const { name } = helloWorldSchema.parse(req.params);

  res.status(200).json({
    message: `Hello ${name} Again!`,
  });
};
