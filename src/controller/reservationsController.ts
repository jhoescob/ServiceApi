import {
  validateReservation,
  validatePartialReservation,
  validateId,
} from "@/schemas/zod/reservationsSchemas";
import jwt from "jsonwebtoken";

import {
  selectAllReservations,
  selectReservationById,
  insertReservation,
  deleteReservationModel,
} from "@/model/reservationsModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

type Decoded = {
  userId: string;
  iat: number;
  exp: number;
};

export const getAllReservations = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Decoded;
      if (decoded) {
        const reservations = await selectAllReservations();

        res.status(200).json({ message: "success", data: reservations[0] });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Token required" });
  }
};

export const getReservationById = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Decoded;
      if (decoded) {
        const resultid = validateId(req.params);

        if (!resultid.success) {
          res.status(400).json({ message: resultid.error });
          return;
        }

        const reservations = await selectReservationById(resultid.data.id);

        if (reservations === "Reservation not found") {
          res.status(404).json({ message: "Reservation not found" });
          return;
        }

        res.status(200).json({ message: "success", data: reservations });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Token required" });
  }
};

export const createReservation = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token required" });
  }

  const decoded = jwt.verify(token, JWT_SECRET) as Decoded;

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const userId = decoded.userId;

  const result = validateReservation(req.body);

  if (!result.success) {
    res.status(400).json({ message: result.error.issues });
    return;
  }

  const number_of_people = result.data.number_of_people;
  const status = result.data.status;

  const resultSlotId = validateId(req.params);

  if (!resultSlotId.success) {
    res.status(400).json({ message: resultSlotId.error });
    return;
  }

  const timeSlotId = resultSlotId.data.id;

  console.log(timeSlotId);

  const resultmodel = await insertReservation(
    userId,
    timeSlotId,
    number_of_people,
    status,
    new Date(),
    new Date()
  );

  if (resultmodel === "OK") {
    res.status(201).json({ message: "Reservation created" });
  } else {
    res.status(400).json({ message: resultmodel });
  }
};

export const deleteReservation = async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token required" });
  }

  const resultSlotId = validateId(req.params);

  if (!resultSlotId.success) {
    res.status(400).json({ message: resultSlotId.error });
    return;
  }

  const resultmodel = await deleteReservationModel(resultSlotId.data.id);

  if (resultmodel === "OK") {
    res.status(200).json({ message: "Reservation deleted" });
  } else {
    res.status(400).json({ message: resultmodel });
  }
};
