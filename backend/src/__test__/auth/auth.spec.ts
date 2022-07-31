import supertest from "supertest";

import app from "../../app";
import prisma from "../../prisma";
import { users } from "./auth.mock.json";

const request = supertest(app);

describe("SignUp a User", () => {
  test("should return 400 on invalid email of a user", async () => {
    const res = await request.post("/api/signUp").send(users[0]);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("Success");
    expect(res.body.payload.email).toContain("tony");
    expect(res.body.token.length).toBeGreaterThan(0);

    await request
      .post("/api/signIn")
      .send({
        email: "tony@email.io",
        password: "liverpool!23",
      })
      .expect(400);
  });

  test("should return 400 on incorrect password of a user", async () => {
    const res = await request.post("/api/signUp").send(users[1]);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("Success");
    expect(res.body.payload.email).toContain("chronos");
    expect(res.body.token.length).toBeGreaterThan(0);

    await request
      .post("/api/signIn")
      .send({
        email: "chronos@keyboard.io",
        password: "liverpool123",
      })
      .expect(400);
  });

  test("should return a token on successful signIn", async () => {
    await request.post("/api/signUp").send(users[5]).expect(201);

    const res = await request.post("/api/signIn").send({
      email: "sun@company.com",
      password: "liverpool!23",
    });
    expect(res.body.token).toBeDefined();
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
});

describe("signIn a User", () => {
  test("should return 201 on successful signup of a user", async () => {
    const res = await request.post("/api/signUp").send(users[1]).expect(201);

    expect(res.body.status).toContain("Success");
    expect(Object.keys(res.body).length).toBe(3);
    expect(res.body.payload.email).toBe(users[1].email);
    expect(res.body.token).toBeDefined();
  });

  test("should return 400 with an invald email", async () => {
    const res = await request.post("/api/signUp").send(users[3]).expect(400);

    expect(Object.keys(res.body).length).toBe(0);
  });

  test("should disallow duplicate emails", async () => {
    await request.post("/api/signUp").send(users[5]).expect(201);
    await request.post("/api/signUp").send(users[5]).expect(400);
  });
  test("should return 400 with an invalid password", async () => {
    const res = await request.post("/api/signUp").send(users[3]).expect(400);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
});
