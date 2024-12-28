import AdminPage from "../page-objects/admin-page/admin-page";
import CommonHelper from "./common-helper";
import { PAGES, HTML_TAGS } from "./constatns";

export default class WebElementsHandler {
  static LOCATORS = {
    mainMenu: "oxd-main-menu",
    loader: ".oxd-loading-spinner-container",
    loggedInUser: "oxd-userdropdown-name",
    successAlert: "oxd-toast--success",
    switch: ".oxd-switch-wrapper",
    dateInput: "oxd-date-input",
    dateInputIcon: ".oxd-date-input-icon",
    calendarDate: "oxd-calendar-date-wrapper",
    calendarCloseBtn: "--close",

    table: "oxd-table",
    tableHeader: "oxd-table-header",
    tableBody: 'class="oxd-table-body"',
    tableRow: "oxd-table-row oxd-table-row--with-border",
    tableCell: "oxd-table-cell oxd-padding-cell",
  };

  static visit_page(pageName: PAGES) {
    cy.get_by_class(this.LOCATORS.mainMenu)
      .contains(HTML_TAGS.li, pageName)
      .click();
  }

  static fill_input_field(locator: string = HTML_TAGS.input, value: string) {
    if (value) cy.get(locator).clear().type(value, { force: true });
  }

  static fill_date_field(value?: string) {
    if (value) {
      cy.get_by_class(this.LOCATORS.dateInput).type(value);
      cy.get_by_class(this.LOCATORS.calendarCloseBtn).click();
    } else {
      cy.get(this.LOCATORS.dateInputIcon).click();
      cy.get_by_class(this.LOCATORS.calendarDate)
        .filter((_, el) => el.className === this.LOCATORS.calendarDate)
        .then(($el) => {
          cy.wrap($el)
            .eq(CommonHelper.generate_random_number(0, $el.length - 1))
            .click();
        });
    }
  }

  static click_on_element_by_locator(elLocator: string) {
    cy.get(elLocator).click();
  }

  static click_on_element_by_content(locator: string, value: string) {
    cy.contains(locator, value).click();
  }

  static toggle_switch_button() {
    this.click_on_element_by_locator(this.LOCATORS.switch);
  }

  static wait_until_it_finished() {
    cy.get(this.LOCATORS.loader, { timeout: 5000 }).should("not.exist");
  }

  static get_logged_in_user() {
    return cy.get_by_class(this.LOCATORS.loggedInUser).invoke("text");
  }

  static within_specific_container_content(locator: string, label: string, fn) {
    cy.contains(locator, label).within(fn);
  }

  static validate_success_alert() {
    cy.get_by_class(this.LOCATORS.successAlert).should("exist");
    this.wait_until_it_finished();
  }

  static validate_required_field(locator: string) {
    cy.get(locator).should("have.css", "border-color", "rgb(235, 9, 16)");
  }

  static clear_field(locator: string) {
    cy.get(locator).clear();
  }

   
  static validateTable(tableSelector, requiredHeaders) {
  }
}
