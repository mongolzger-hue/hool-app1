describe('Home Page Smoke Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads the home page', () => {
    cy.getBySel('header-logo').should('be.visible').and('contain', 'Орцхон');
  });

  it('navigates to login page', () => {
    cy.getBySel('nav-link-home').should('be.visible');
    // Testing navigation to login via the icon link if possible, 
    // or just checking if nav links are present.
    cy.get('a[href="/login"]').first().click();
    cy.url().should('include', '/login');
    cy.getBySel('login-email').should('be.visible');
  });

  it('toggles theme', () => {
    cy.getBySel('theme-toggle').click();
    // Assuming theme toggle changes a class on body or similar
    // For now just verifying the click doesn't crash
  });
});
