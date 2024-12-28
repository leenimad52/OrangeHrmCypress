export { }

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>
        get_by_class(className: string): Chainable<JQuery>
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
