import {
  pgTable,
  text,
  uuid,
  numeric,
  date,
  time,
  boolean,
} from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: uuid("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
});

export const TimeSlot = pgTable("timeslots", {
  id: uuid("id").primaryKey(),
  date: date("date").notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  available: boolean("available").notNull(),
});

export const Reservation = pgTable("reservations", {
  id: uuid("id").primaryKey(),
  user_id: uuid("user_id").references(() => User.id), //foreign key from User table
  time_slot_id: uuid("timeslot_id").references(() => TimeSlot.id), //foreign key from TimeSlot table
  number_of_people: numeric("number_of_people").notNull(),
  status: text("status").notNull(),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
});
