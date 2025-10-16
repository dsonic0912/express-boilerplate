import { type Request, type Response } from "express";
import { userSchema } from "#schemas/user.js";
import { Password } from "#services/password.js";
import pool from "#db/db.js";
import { z } from "zod";
import jwt from "jsonwebtoken";

const userSignupFormSchema = userSchema.omit({ id: true, created_at: true });

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = userSignupFormSchema.parse(req.body);

    const hashedPassword = await Password.toHash(password);

    const query = "INSERT INTO user_account (email, password) VALUES ($1, $2) RETURNING *";
    const values = [email, hashedPassword];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.flat(),
      });
    }

    res.status(500).json({ message: "Failed to create user" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = userSignupFormSchema.parse(req.body);

    const query = "SELECT * FROM user_account WHERE email = $1";
    const values = [email];

    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await Password.compare(user.password, password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    res.cookie("sessionToken", userJwt, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.flat(),
      });
    }
    res.status(500).json({ message: "Failed to sign in" });
  }
};
