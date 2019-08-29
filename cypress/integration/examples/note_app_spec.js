describe('Note ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3003/api/blogs')
    cy.contains('Notes')
  })
})