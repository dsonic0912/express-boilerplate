import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "#index.js";

describe ("Hello World", () => {
  it("should return Hello World", async () => {
    const response = await request(app).get("/helloworld");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Hello World Again!",
    });
  });
});
