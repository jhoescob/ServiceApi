import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegister, validateLogin } from "@/schemas/zod/authSchemas";
import { createUser, getUserByEmail } from "@/model/authModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (req: Request, res: Response) => {
  const result = validateRegister(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }
  const { email, username, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const resultCreate = await createUser(email, username, hashedPassword);

  if (resultCreate === "Email already exists") {
    return res.status(400).json({ error: "Email already exists" });
  }
  if (resultCreate === "something went wrong") {
    return res.status(500).json({ error: "something went wrong" });
  }

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = validateLogin(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }

    const { email, password } = result.data;
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(400).json({ error: "something went wrong" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};
