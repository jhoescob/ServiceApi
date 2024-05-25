import z from "zod";
import { ZodError } from "zod";

type T = {
  number_of_people: number;
  status: string;
};

type Tsp = {
  number_of_people?: number | undefined;
  status?: string | undefined;
};

type ValidateReservationType =
  | { success: true; data: T }
  | { success: false; error: ZodError };

type ValidateReservationTypeSp =
  | { success: true; data: Tsp }
  | { success: false; error: ZodError };

type ValidateIdType =
  | { success: true; data: { id: string } }
  | { success: false; error: ZodError };

const reservationSchema = z.object({
  number_of_people: z.number({
    invalid_type_error: "user_id must be a string.",
    required_error: "user_id is required.",
  }),
  status: z.string({
    invalid_type_error: "timeslot_id must be a string.",
    required_error: "timeslot_id is required.",
  }),
});

const idSchema = z.object({
  id: z.string({
    invalid_type_error: "id must be a string.",
    required_error: "id is required.",
  }),
});

function validateReservation(data: any): ValidateReservationType {
  const result = reservationSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

function validatePartialReservation(data: any): ValidateReservationTypeSp {
  const result = reservationSchema.partial().safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

function validateId(data: any): ValidateIdType {
  const result = idSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

export { validateReservation, validatePartialReservation, validateId };
