import { LOCATORS as ADMIN_LOCATORS } from "./admin-page";
import { LABELS as ADMIN_LABELS } from "./admin-page";
import WebElementsHandler from "../../helpers/web-elements-handler";
import { HTML_TAGS } from "../../helpers/constatns";

export default class SearchUserDialog {
  static fill_form(userDetails) {
    if (userDetails.username) {
      WebElementsHandler.within_specific_container_content(
        ADMIN_LOCATORS.inputGroup,
        ADMIN_LABELS.username,
        () => {
          WebElementsHandler.fill_input_field(undefined, userDetails.username);
        }
      );
    }
    // // Fill User Role
    if (userDetails.userRole) {
      WebElementsHandler.within_specific_container_content(
        ADMIN_LOCATORS.inputGroup,
        ADMIN_LABELS.userRole,
        () => {
          WebElementsHandler.click_on_element_by_locator(
            ADMIN_LOCATORS.dropdownArrow
          ); // Open the dropdown
          WebElementsHandler.click_on_element_by_content(
            ADMIN_LOCATORS.dropdownOptions,
            userDetails.userRole
          ); // Select the option
        }
      );
    }
    // // Fill Employee Name
    if (userDetails.employeeName) {
      WebElementsHandler.within_specific_container_content(
        ADMIN_LOCATORS.inputGroup,
        ADMIN_LABELS.employeeName,
        () => {
          WebElementsHandler.fill_input_field(
            undefined,
            userDetails.employeeName
          );
          cy.get(ADMIN_LOCATORS.employeeNameField)
            .find(HTML_TAGS.div)
            .contains(userDetails.employeeName)
            .click();
        }
      );
    }
    // Fill Status
    if (userDetails.status) {
      WebElementsHandler.within_specific_container_content(
        ADMIN_LOCATORS.inputGroup,
        ADMIN_LABELS.status,
        () => {
          WebElementsHandler.click_on_element_by_locator(
            ADMIN_LOCATORS.dropdownArrow
          );
          WebElementsHandler.click_on_element_by_content(
            ADMIN_LOCATORS.dropdownOptions,
            userDetails.status
          );
        }
      );
    }
  }
  ///////////////////////////////////////////
  static click_reset_button() {
    WebElementsHandler.click_on_element_by_content(
      ADMIN_LOCATORS.resetButton,
      ADMIN_LABELS.reset
    );
  }

  static click_search_button() {
    WebElementsHandler.click_on_element_by_content(
      ADMIN_LOCATORS.searchButton,
      ADMIN_LABELS.search
    );
  }

  // static usersTableValidation(data) {
  //   WebElementsHandler.validateTable(data);
  // }
}
