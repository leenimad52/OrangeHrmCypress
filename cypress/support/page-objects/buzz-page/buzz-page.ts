import ApiHelper from "../../helpers/api-helper";
import CommonHelper from "../../helpers/common-helper";
import { API_URLS, PAGES } from "../../helpers/constatns";
import WebElementsHandler from "../../helpers/web-elements-handler";
import { LABELS } from "../admin-page/admin-page";

export class BuzzPage {
  
  static visit(visitBaseUrl: boolean = false) {
      if (visitBaseUrl) cy.visit("/");
  
      const aliasName = CommonHelper.generate_random_string(LABELS.admin, 10);
      ApiHelper.intercept_with_alias_name(API_URLS.ADMIN, undefined, aliasName);
      WebElementsHandler.visit_page(PAGES.BUZZ);
    }
  
    writePost(post) {
      cy.get('textarea[placeholder="What\'s on your mind?"]').type(post);
  }
  
  clickPostButton() {
    cy.get('button[type="submit"]').contains('Post').click();
  }
  
  verifyPostSuccess() {
    cy.get('p.oxd-text--toast-title').should('have.text', 'Success');
  }
  }