import request from "supertest";
import express from "express";
import { timeslotsRoutes } from "@/routers/timeslotsRoutes";

const app = express();
app.use(express.json());
app.use("/api/timeslots", timeslotsRoutes);

describe("Timeslots Routes", () => {
  it("should return 200 and Create route", async () => {
    const response = await request(app).post("/api/timeslots").send({
      date: "2020-09-10",
      start_time: "00:00:00",
      end_time: "00:00:00",
      available: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "TimeSlot Created",
    });
  });

  it("should return 400 for invalid_string", async () => {
    const response = await request(app).post("/api/timeslots").send({
      date: "2020-09-10",
      start_time: "00:00:00",
      end_time: "time",
      available: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app).post("/api/timeslots").send({
      date: "2020-09-10",
      start_time: "00:00:00",
      end_time: "time",
      available: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: [
        {
          code: "invalid_string",
          validation: "time",
          message: "end_time must be a string with this formar HH:MM:SS",
          path: ["end_time"],
        },
      ],
    });
  });

  it("GET ALL should return 200 ", async () => {
    const response = await request(app).get("/api/timeslots");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });

  it("GET ID should return 200 and id", async () => {
    const response = await request(app).get(
      "/api/timeslots/d8e9659f-244a-46d8-aff1-e9ff92478bf3"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });

  it("should return 200 and id", async () => {
    const response = await request(app)
      .put("/api/timeslots/d8e9659f-244a-46d8-aff1-e9ff92478bf3")
      .send({
        available: false,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "TimeSlot Updated",
    });
  });
});
