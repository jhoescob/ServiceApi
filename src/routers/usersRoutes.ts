import { Router } from "express";
import { getUser } from "@/controller/userController";
export const usersRoutes = Router();

usersRoutes.get("/me", getUser);
