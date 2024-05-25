import { Router } from "express";
import { register, login, logout } from "@/controller/authController";

export const authRoutes = Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
