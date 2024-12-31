import { BuzzPage } from "../../support/page-objects/buzz-page/buzz-page";

describe('Buzz Page Post Test', () => {
  const buzzPage = new BuzzPage();

  beforeEach(() => {    
cy.login()
  BuzzPage.visit();

});

it('should write a post', () => {
    cy.fixture('posts').then((posts)=>{
        buzzPage.writePost(posts.postText);
        buzzPage.clickPostButton();
        buzzPage.verifyPostSuccess()
    });

});

});