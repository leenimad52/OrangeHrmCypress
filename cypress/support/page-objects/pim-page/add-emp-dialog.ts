import { ASSERTION, CSS_SELECTORS } from "../../helpers/constatns";
import WebElementsHandler from "../../helpers/web-elements-handler";
import PimPage, { LOCATORS as PIM_LOCATORS } from "./pim-page";

export const LOCATORS = {
  userFormHeader: ".user-form-header",
};

export const LABELS = {
  empId: "Employee Id",
  createLoginDetails: "Create Login Details",
  username: "Username",
  password: "Password",
  confirmPassword: "Confirm Password",
};

export interface IEmployeeDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;

  otherId?: string;
  drivingLicenseNo?: string;
  drivingLicenseExpiredDate?: string;
  gender?: string;
  maritalStatus?: string;
  birthday?: string;
  nationality?: string;
}

export interface IEmployeeLoginDetails {
  username: string;
  password: string;
}

export default class AddEmployeeDialog {
  static fill_employee_details(
    employeeDetails: IEmployeeDetails,
    employeeLoginDetails?: IEmployeeLoginDetails
  ) {
    WebElementsHandler.fill_input_field(
      PIM_LOCATORS.firstName,
      employeeDetails.firstName
    );
    WebElementsHandler.fill_input_field(
      PIM_LOCATORS.middleName,
      employeeDetails.middleName
    );
    WebElementsHandler.fill_input_field(
      PIM_LOCATORS.lastName,
      employeeDetails.lastName
    );

    WebElementsHandler.within_specific_container_content(
      PIM_LOCATORS.inputGroup,
      LABELS.empId,
      () => {
        WebElementsHandler.fill_input_field(
          undefined,
          employeeDetails.employeeId
        );
      }
    );

    if (employeeLoginDetails) {
      WebElementsHandler.within_specific_container_content(
        LOCATORS.userFormHeader,
        LABELS.createLoginDetails,
        () => {
          WebElementsHandler.toggle_switch_button();
        }
      );

      WebElementsHandler.within_specific_container_content(
        PIM_LOCATORS.inputGroup,
        LABELS.username,
        () => {
          WebElementsHandler.fill_input_field(
            undefined,
            employeeLoginDetails.username
          );
        }
      );
      WebElementsHandler.within_specific_container_content(
        PIM_LOCATORS.inputGroup,
        LABELS.password,
        () => {
          WebElementsHandler.fill_input_field(
            undefined,
            employeeLoginDetails.password
          );
        }
      );
      WebElementsHandler.within_specific_container_content(
        PIM_LOCATORS.inputGroup,
        LABELS.confirmPassword,
        () => {
          WebElementsHandler.fill_input_field(
            undefined,
            employeeLoginDetails.password
          );
        }
      );
    }
  }

  static click_on_save_button() {
    PimPage.click_on_save_button();
  }

  static validate_required_field(locator: string) {
    cy.get(locator).should(ASSERTION.Have_css, CSS_SELECTORS.Border_color, CSS_SELECTORS.Red_Color);
  }
}
