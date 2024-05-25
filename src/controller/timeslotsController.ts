import {
  validateTimeSlot,
  validatePartialTimeSlot,
  validateId,
} from "@/schemas/zod/timeslotSchema";

import * as timeslotModel from "@/model/timeslotsModel";

export class TimeSlotController {
  constructor() {}

  getAllTimeSlots = async (req: any, res: any) => {
    const result = await timeslotModel.selectAllTimeSlots();
    res.status(200).json({ data: result });
  };

  getTimeSlotById = async (req: any, res: any) => {
    const result = validateId(req.params);
    if (!result.success) {
      if (result.error === undefined) {
        res.status(400).json({ error: "Invalid input" });
        return;
      }
      res.status(400).json({ error: result.error.issues });
      return;
    }

    const resultId = await timeslotModel.selectTimeSlotById(result.data.id);

    if (resultId === "Time slot not found") {
      res.status(404).json({ error: "Time slot not found" });
      return;
    }

    res.status(200).json({ data: resultId });
  };

  createTimeSlot = async (req: any, res: any) => {
    const result = validateTimeSlot(req.body);
    if (!result.success) {
      if (result.error === undefined) {
        res.status(400).json({ error: "Invalid input" });
        return;
      }
      res.status(400).json({ error: result.error.issues });
      return;
    }
    //do model here

    const resultModel = await timeslotModel.insertTimeSlot(
      result.data.date,
      result.data.start_time,
      result.data.end_time,
      result.data.available
    );

    if (resultModel === "OK") {
      res.status(200).json({ message: "TimeSlot Created" });
    } else {
      return res.status(500).json({ error: resultModel });
    }
  };

  updateTimeSlot = async (req: any, res: any) => {
    const resultId = validateId(req.params);
    if (!resultId.success) {
      if (resultId.error === undefined) {
        res.status(400).json({ error: "Invalid input" });
        return;
      }
      res.status(400).json({ error: resultId.error.issues });
      return;
    }
    const result = validatePartialTimeSlot(req.body);

    if (!result.success) {
      if (result.error === undefined) {
        res.status(400).json({ error: "Invalid input" });
        return;
      }
      res.status(400).json({ error: result.error.issues });
      return;
    }

    console.log(resultId.data.id);
    console.log(result.data);

    const resultModel = await timeslotModel.updatePartialTimeSlot(
      resultId.data.id,
      result.data
    );

    if (resultModel === "OK") {
      res.status(200).json({ message: "TimeSlot Updated" });
    } else {
      return res.status(500).json({ error: resultModel });
    }
  };

  deleteTimeSlot = async (req: any, res: any) => {
    const resultId = validateId(req.params);
    if (!resultId.success) {
      if (resultId.error === undefined) {
        res.status(400).json({ error: "Invalid input" });
        return;
      }
      res.status(400).json({ error: resultId.error.issues });
      return;
    }

    const resultModel = await timeslotModel.deleteTimeSlot(resultId.data.id);

    if (resultModel === "OK") {
      res.status(200).json({ message: "TimeSlot Deleted" });
    } else {
      return res.status(500).json({ error: resultModel });
    }
  };
}
