describe("Stream Looker", () => {
    it("Check details of Interstellar movie", () => {
        cy.visit("localhost:3000");
        cy.get("input").type("Interstellar");
        cy.wait(5000);
        cy.get("span").contains(".movie-element-title", new RegExp("^Interstellar$")).click();
        cy.get("img").should("be.visible").and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
        cy.get(".movie-view-title").should("have.text", "Interstellar");
        cy.get(".movie-view-data > div").eq(1).should("have.text", "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.");
        cy.get(".movie-view-data > span").eq(0).should("have.text", "Year: 2014");
        cy.get(".movie-view-data > span").eq(1).should("have.text", "Type: movie");
        cy.get(".movie-view-data > span").eq(2).should("have.text", "Genres: Adventure, Drama, Science Fiction");
        cy.get(".movie-element-rating-box").first().should("have.text", "8.4");
        cy.get(".movie-element-rating-box").last().should("have.text", "73");
        cy.get("iframe").should("have.attr", "src", "https://www.youtube.com/embed/zSWdZVtXT7E");
        cy.contains("button", "Back to search").click();
    })
})