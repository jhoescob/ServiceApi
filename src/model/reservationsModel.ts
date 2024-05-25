import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { TimeSlot, User, Reservation } from "@/schemas/drizzle/schema";
import { v4 as uuidv4 } from "uuid";

export const selectAllReservations = async () => {
  return await db.select().from(Reservation);
};

export const selectReservationById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(Reservation)
      .where(eq(Reservation.id, id));
    return result[0];
  } catch (err: any) {
    return "Reservation not found";
  }
};
// aqui FK
export const insertReservation = async (
  user_id: any,
  time_slot_id: any,
  number_of_people: any,
  status: any,
  created_at: any,
  updated_at: any
) => {
  try {
    const newid = uuidv4();

    await db.insert(Reservation).values({
      id: newid,
      user_id,
      time_slot_id,
      number_of_people,
      status,
      created_at,
      updated_at,
    });

    return "OK";
  } catch (err: any) {
    if (err.code === "23505") {
      return "Reservation already exists";
    } else {
      return "something went wrong";
    }
  }
};

export const deleteReservationModel = async (id: string) => {
  try {
    await db.delete(Reservation).where(eq(Reservation.id, id));
    return "OK";
  } catch (err: any) {
    return "Reservation not found";
  }
};
