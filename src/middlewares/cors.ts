import cors from "cors";

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://example.com";

export function corsMiddleware() {
  return cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });
}
