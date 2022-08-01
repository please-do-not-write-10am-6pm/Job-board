describe("jobs page test", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: `http://localhost:3000/api/signIn`,
      body: {
        email: "donaldo3@email.io",
        password: "liverpool1@3",
      },
    }).then((res) => {
      console.log(res.body);
      window.localStorage.setItem("token", res.body.token);
      cy.visit("http://localhost:4000/jobs");
    });
  });
  it("should change login button into Logout in nabvar and click Logout button then go to the login page", () => {
    cy.url().should("include", "/jobs");
    cy.get(".css-1d0ox2v").contains("Logout");
    cy.get(".css-1d0ox2v").click();
    cy.url().should("include", "/login");
  });
  it("should go into the create a job page when click a Create Job button", () => {
    cy.get(".css-1tm2kph").click();
    cy.url().should("include", "/job/create");
    cy.contains("Enjoy a Job!");
    cy.get('input[name="title"]').type("Hello a Job");
    cy.get('textarea[name="description"]').type("Here is a description");
    cy.get('input[name="rate"]').type("120");
    cy.get("button").contains("Save").click();
    cy.url().should("contains", "/jobs");
    cy.get(".Toastify__toast-body").contains("Success");
  });
  it("should go into the update a job page when click a update button.", () => {
    cy.get(".css-51o2cm:first").click();
    cy.url().should("contains", "/edit");
    cy.get("input[name='title']").should("have.value", "Hello a Job");
    cy.get("textarea[name='description']").should(
      "have.value",
      "Here is a description"
    );
    cy.get("input[name=title]").type("Hi, A Job");
    cy.get("button").contains("Save").click();
    cy.url().should("include", "/jobs");
    cy.get(".Toastify__toast-body").contains("Success");
  });
  it("should approve or block a job when click a button", () => {
    cy.get(".css-g3x0wt").within((el) => {
      cy.get(".css-1vdf0dv:first").click();
      cy.get(".css-koy0i7:first").click();
    });
  });
});
