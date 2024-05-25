import z from "zod";
import { ZodError } from "zod";

type T = {
  date: string;
  start_time: string;
  end_time: string;
  available: boolean;
};

type Tsp = {
  date?: string | undefined;
  start_time?: string | undefined;
  end_time?: string | undefined;
  available?: boolean | undefined;
};

type ValidateTimeSlotType =
  | { success: true; data: T }
  | { success: false; error: ZodError };

type ValidateTimeSlotTypeSp =
  | { success: true; data: Tsp }
  | { success: false; error: ZodError };

type ValidateIdType =
  | { success: true; data: { id: string } }
  | { success: false; error: ZodError };

// Create a new timeslot (staff only). Receives date, start_time, end_time, available.
const timeslotSchema = z.object({
  date: z
    .string({
      invalid_type_error: "Date must be a string.",
      required_error: "Date is required.",
      message: "end_time must be a string with this formar YYYY-MM-DD",
    })
    .date("end_time must be a string with this formar YYYY-MM-DD"),
  start_time: z
    .string({
      invalid_type_error: "start_time must be a string.",
      required_error: "start_time is required.",
    })
    .time({ message: "end_time must be a string with this formar HH:MM:SS" }),
  end_time: z
    .string({
      invalid_type_error: "end_time must be a string.",
      required_error: "end_time is required.",
    })
    .time({ message: "end_time must be a string with this formar HH:MM:SS" }),
  available: z.boolean({
    required_error: "available is required",
    invalid_type_error: "available must be a boolean",
  }),
});

const idSchema = z.object({
  id: z.string({
    invalid_type_error: "Date must be a string.",
    required_error: "Date is required.",
    message: "end_time must be a string with this formar YYYY-MM-DD",
  }),
});

function validateTimeSlot(input: any): ValidateTimeSlotType {
  const result = timeslotSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

function validatePartialTimeSlot(input: any): ValidateTimeSlotTypeSp {
  const result = timeslotSchema.partial().safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

function validateId(input: any): ValidateIdType {
  const result = idSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

export { validateTimeSlot, validatePartialTimeSlot, validateId };
