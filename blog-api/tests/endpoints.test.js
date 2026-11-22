const request = require("supertest");
const app = require("../index");

describe("Simple endpoint checks", () => {
  test("GET /api/auth/verify returns 401 without a token", async () => {
    const response = await request(app).get("/api/auth/verify");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });

  test("GET /api/auth/verify returns 403 for an invalid token", async () => {
    process.env.JWT_SECRET = "test-secret";

    const response = await request(app)
      .get("/api/auth/verify")
      .set("Cookie", ["accessToken=invalid-token"]);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: "Invalid or Expired Token" });
  });

  test("Unknown endpoints return 404", async () => {
    const response = await request(app).get("/api/does-not-exist");

    expect(response.status).toBe(404);
  });
});
