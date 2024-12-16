import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Pharmacist1, Pharmacist2, Technician, Assistant1, Assistant2
  color: text("color").notNull()
});

export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  staffId: serial("staff_id").references(() => staff.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  dayOfWeek: text("day_of_week").notNull() // Sunday to Saturday
});

export const insertStaffSchema = createInsertSchema(staff);
export const selectStaffSchema = createSelectSchema(staff);
export const insertScheduleSchema = createInsertSchema(schedules);
export const selectScheduleSchema = createSelectSchema(schedules);
