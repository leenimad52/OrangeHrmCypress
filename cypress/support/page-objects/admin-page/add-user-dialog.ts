import { HTML_TAGS } from "../../helpers/constatns";
import WebElementsHandler from "../../helpers/web-elements-handler";
import { LOCATORS as ADMIN_LOCATORS } from "./admin-page";
import { LABELS as ADMIN_LABELS } from "./admin-page";


export interface IUserDetails {
  userRole: string;
  status: string;
  employeeName: string;
  username: string;
  password: string;
}

export default class AddUserDialog {

  static fill_user_details(userDetails: IUserDetails) {
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
        ); 
      }
    );

    // Status
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

    // Fill Password
    WebElementsHandler.within_specific_container_content(
      ADMIN_LOCATORS.inputGroup,
      ADMIN_LABELS.password,
      () => {
        WebElementsHandler.fill_input_field(undefined, userDetails.password);
      }
    );

    // Employee Name
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

    //Fill Username
    WebElementsHandler.within_specific_container_content(
      ADMIN_LOCATORS.inputGroup,
      ADMIN_LABELS.username,
      () => {
        WebElementsHandler.fill_input_field(undefined, userDetails.username);
      }
    );

    // Fill Confirm Password
    WebElementsHandler.within_specific_container_content(
      ADMIN_LOCATORS.inputGroup,
      ADMIN_LABELS.confirmPassword,
      () => {
        WebElementsHandler.fill_input_field(undefined, userDetails.password);
      }
    );
  }

  static click_on_save_button() {
    WebElementsHandler.click_on_element_by_content(HTML_TAGS.button, ADMIN_LABELS.save);
  }

  static validate_required_field(locator: string) {
    WebElementsHandler.validate_required_field(locator);
  }
}
