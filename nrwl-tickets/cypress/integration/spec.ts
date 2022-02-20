describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Run all tests')
    cy.contains('Code coverage report for All files')
  })
})
