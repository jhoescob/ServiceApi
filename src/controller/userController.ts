import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "@/model/authModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

type Decoded = {
  userId: string;
  iat: number;
  exp: number;
};

export const getUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Decoded;

      if (decoded) {
        const result = await getUserById(decoded.userId);

        res.status(200).json({ message: "success", data: result[0] });
      }

      //const result = await getUserById(decoded.userId);
      //   res.json(result.rows[0]);
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Token required" });
  }
};
