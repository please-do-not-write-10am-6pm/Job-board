import { hash } from "bcryptjs";
import supertest from "supertest";

import app from "../../app";
import prisma from "../../prisma";
import { users } from "./user.mock.json";

const request = supertest(app);

describe("CRUD a User", () => {
  let token: string;

  beforeAll(async () => {
    const res = await request.post("/api/signUp").send(users[0]);
    token = res.body.token;
  });

  test("not admin should not get all users", async () => {
    const res = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
    expect(Object.keys(res.body).length).toBe(0);
  });

  //   afterAll(async () => {
  //     await prisma.user.deleteMany({});
  //   });
});
