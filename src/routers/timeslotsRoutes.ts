import { Router } from "express";
import { TimeSlotController } from "@/controller/timeslotsController";

export const timeslotsRoutes = Router();

const timeSlotController = new TimeSlotController();

timeslotsRoutes.get("/", timeSlotController.getAllTimeSlots);

timeslotsRoutes.get("/:id", timeSlotController.getTimeSlotById);

timeslotsRoutes.post("/", timeSlotController.createTimeSlot);

timeslotsRoutes.put("/:id", timeSlotController.updateTimeSlot);

timeslotsRoutes.delete("/:id", timeSlotController.deleteTimeSlot);
