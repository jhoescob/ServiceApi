import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { TimeSlot } from "@/schemas/drizzle/schema";
import { v4 as uuidv4 } from "uuid";

type TimeSlot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  available: boolean;
};

type TimeSlots = TimeSlot[];

type ErrorNotFound = {
  message: string;
};

type SelectTimeSlotById = TimeSlot | string;

export const selectAllTimeSlots = async (): Promise<TimeSlots> => {
  return await db.select().from(TimeSlot);
};

export const selectTimeSlotById = async (
  id: string
): Promise<SelectTimeSlotById> => {
  try {
    const result = await db.select().from(TimeSlot).where(eq(TimeSlot.id, id));
    return result[0];
  } catch (err: any) {
    return "Time slot not found";
  }
};

export const insertTimeSlot = async (
  date: string,
  start_time: string,
  end_time: string,
  available: boolean
) => {
  try {
    await db.insert(TimeSlot).values({
      id: uuidv4(),
      date,
      start_time,
      end_time,
      available,
    });
    return "OK";
  } catch (err: any) {
    if (err.code === "23505") {
      return "Time slot already exists";
    } else {
      return "something went wrong";
    }
  }
};

export const updatePartialTimeSlot = async (
  id: string,
  data: {
    date?: string;
    start_time?: string;
    end_time?: string;
    available?: boolean;
  }
) => {
  let setObject = [];

  if (data.date !== undefined) {
    setObject.push({ date: data.date });
  } else if (data.start_time !== undefined) {
    setObject.push({ start_time: data.start_time });
  } else if (data.end_time !== undefined) {
    setObject.push({ end_time: data.end_time });
  } else if (data.available !== undefined) {
    setObject.push({ available: data.available });
  }

  if (setObject.length === 0) {
    return "No data to update";
  }

  const updateObject = setObject.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});

  try {
    await db.update(TimeSlot).set(updateObject).where(eq(TimeSlot.id, id));
    return "OK";
  } catch (err: any) {
    return "something went wrong";
  }
};

export const deleteTimeSlot = async (id: string) => {
  try {
    await db.delete(TimeSlot).where(eq(TimeSlot.id, id));
    return "OK";
  } catch (err: any) {
    return "something went wrong";
  }
};
