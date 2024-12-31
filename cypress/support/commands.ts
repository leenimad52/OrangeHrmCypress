export { }

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>
        get_by_class(className: string): Chainable<JQuery>
        validate_table(expectedHeaders: string[], expectedData: string[][]): Chainable<void>;
      }
  }
}
const baseUrl = Cypress.config().baseUrl

Cypress.Commands.add('get_by_class', (className: string) => {
  return cy.get(`.${className}`)
})

Cypress.Commands.add('login', (username: string = 'Admin', password: string = 'admin123') => {
  if (username)
    cy.get('[name=username]').type(username)
  if (password)
    cy.get('[name=password]').type(password)

  cy.get('button').contains('Login').click()
})

Cypress.Commands.add('validate_table', (expectedHeaders, expectedData) => {

  cy.get('.oxd-table-header [role="columnheader"]').each(($header, index) => {
    cy.wrap($header).should('contain.text', expectedHeaders[index]);
  });

  cy.get('.oxd-table-body [role="row"]').each(($row, rowIndex) => {
    expectedData[rowIndex].forEach((cellData, columnIndex) => {
      cy.wrap($row).find('[role="cell"]').eq(columnIndex).should('contain.text', cellData);
    });
  });
  
});
