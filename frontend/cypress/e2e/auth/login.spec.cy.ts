import { users } from "../mock.user.json";

describe("login page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });

  it("should reject a request when login with not registered user", () => {
    cy.url().should("include", "/login");
    cy.get("input[name=email]").type(users[1].email);
    cy.get("input[name=password]").type(users[1].password);
    cy.get("button").contains("Sign in").click();
    cy.get(".Toastify__toast-body").contains("Request failed with status code");
    cy.url().should("include", "/login");
  });

  it("should reject a validation error when login with invalid email", () => {
    cy.url().should("include", "/login");
    cy.get("input[name=email]").type(users[6].email);
    cy.get("input[name=password]").type(users[6].password);
    cy.get("button").contains("Sign in").click();
    cy.contains("Invalid email");
    cy.url().should("include", "/login");
  });

  // same test when invalid password
  it("should login with registered user", () => {
    cy.url().should("include", "/login");
    cy.get("input[name=email]").type(users[2].email);
    cy.get("input[name=password]").type(users[2].password);
    cy.get("button").contains("Sign in").click();
    cy.url().should("include", "/job");
  });
});
