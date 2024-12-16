import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db/index";
import { staff, schedules } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get all staff
  app.get("/api/staff", async (_req, res) => {
    const allStaff = await db.select().from(staff);
    res.json(allStaff);
  });

  // Get schedules for a week
  app.get("/api/schedules", async (_req, res) => {
    const allSchedules = await db.select().from(schedules);
    res.json(allSchedules);
  });

  // Add new schedule
  app.post("/api/schedules", async (req, res) => {
    const { staffId, startTime, endTime, dayOfWeek } = req.body;
    
    const newSchedule = await db.insert(schedules).values({
      staffId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      dayOfWeek
    }).returning();

    res.json(newSchedule[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}
