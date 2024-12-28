import ApiHelper from "../../helpers/api-helper";
import CommonHelper from "../../helpers/common-helper";
import { API_URLS, PAGES } from "../../helpers/constatns";
import WebElementsHandler from "../../helpers/web-elements-handler";

export const LOCATORS = {
  navBar: ".oxd-topbar-body-nav-tab",
  inputGroup: ".oxd-input-group",
  firstName: ".orangehrm-firstname",
  middleName: ".orangehrm-middlename",
  lastName: ".orangehrm-lastname",
  button: ".oxd-button",
  personalDetailsSection: ".orangehrm-vertical-padding",
  customFieldsSection: ".orangehrm-custom-fields",
  attachmentsSection: ".orangehrm-attachment",
};

export const LABELS = {
  pim: "PIM",
  addEmployee: "Add Employee",
  save: "Save",
  cancel: "Cancel",
};

export default class PimPage {
  static visit(visitBaseUrl: boolean = false) {
    if (visitBaseUrl) cy.visit("/");

    const aliasName = CommonHelper.generate_random_string(LABELS.pim, 10);
    ApiHelper.intercept_with_alias_name(
      API_URLS.PIM_EMPLOYEES,
      undefined,
      aliasName
    );
    WebElementsHandler.visit_page(PAGES.PIM);
    cy.wait(`@${aliasName}`).then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  }

  static click_on_add_employee() {
    WebElementsHandler.click_on_element_by_content(
      LOCATORS.navBar,
      LABELS.addEmployee
    );
    WebElementsHandler.wait_until_it_finished();
  }
  static click_on_save_button() {
    WebElementsHandler.click_on_element_by_content(
      LOCATORS.button,
      LABELS.save
    );
    WebElementsHandler.validate_success_alert();
  }

  static click_on_cancel_button() {
    WebElementsHandler.click_on_element_by_content(
      LOCATORS.button,
      LABELS.cancel
    );
  }
}
