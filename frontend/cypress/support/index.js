import "./commands";

// eslint-disable-next-line no-undef
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
