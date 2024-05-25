import request from "supertest";
import express from "express";
import { usersRoutes } from "@/routers/usersRoutes";

const app = express();
app.use(express.json());
app.use("/api/users", usersRoutes);

describe("Auth Routes", () => {
  it("should return 200 for authorization", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTY1NzdlMy00ZTQ2LTQ0OGUtYmJjNi04MTNhZmExYTA0OWEiLCJpYXQiOjE3MTY1MzU1NTcsImV4cCI6MTcxNjUzOTE1N30.FjcWJJl0STpbA5QbLhJ8jVGw6lUB0esQUCgKHEP_8Xo`
      );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("should return 401 for Unauthorized", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set(
        "Authorization",
        `Bearer eXVCJ9.eyJ1c2VySWQiOiI1NTY1NzdlMy00ZTQ2LTQ0OGUtYmJjNi04MTNhZmExYTA0OWEiLCJpYXQiOjE3MTY1MzU1NTcsImV4cCI6MTcxNjUzOTE1N30.FjcWJJl0STpbA5QbLhJ8jVGw6lUB0esQUCgKHEP_8Xo`
      );

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("should return 401 for Token required", async () => {
    const response = await request(app).get("/api/users/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Token required",
    });
  });
});
