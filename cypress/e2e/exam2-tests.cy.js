describe('Create User API Tests', () => {
    it('should update a note for LTAT 05.006', () => {
        const note = '123';
        const code = 'LTAT 05.006';
        const url = `http://localhost:3000/api/mycoursesNote/${code}`;  
        cy.request('PUT', url, { note: note })
            .should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.note).to.be.a('string');
            });
    });
});
it('Test 1', () => {
    cy.visit('http://localhost:8080');
    cy.get('.codebutton').eq(0).click();
    cy.get('.noteinput').eq(0).clear().type('test note');
    cy.get('.noteupdate').eq(0).click();
  })
  