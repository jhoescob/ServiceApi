import { Router } from "express";

import {
  createReservation,
  deleteReservation,
  getReservationById,
  getAllReservations,
} from "@/controller/reservationsController";

export const reservationsRoutes = Router();

reservationsRoutes.get("/", getAllReservations);

reservationsRoutes.get("/:id", getReservationById);

reservationsRoutes.post("/:id", createReservation);

reservationsRoutes.delete("/:id", deleteReservation);
