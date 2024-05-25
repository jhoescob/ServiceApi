import request from "supertest";
import express from "express";
import { authRoutes } from "@/routers/authRoutes";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  it("should return 200 and Log in and have Token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "jhoansdf@gmail.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 with error", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "jhoansdf@gmail.com",
      password: "12345678s",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 Already register Email", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "jhoan escobardf",
      email: "jhoansdasddff@gmail.com",
      password: "12345678asdf",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Email already exists",
    });
  });
});
