/// <reference types = "cypress"/>  

it('Test 1', () => {
    // Step 1: Visit the Courses page
    cy.visit('http://localhost:8080/');
  
    // Step 2: Check if it has an 'h3' element that contains 'Courses'
    cy.get('h3').contains('Courses');
  
    // Step 3: Locate the first link inside the table and click it
    cy.get('.container table tr.item td:nth-child(3) a').first().invoke('text').as('clickedSemester');
    cy.get('.container table tr.item td:nth-child(3) a').first().click();
    cy.get('@clickedSemester').then((clickedSemester) => {
      // Step 4: Check if the page is redirected to Semester.vue
      cy.url().should('include', `${clickedSemester}`);
  
      // Step 5: Check if the 'h3' in SemesterView contains the selected semester
      cy.get('h3').contains(`${clickedSemester}`);
  });
});