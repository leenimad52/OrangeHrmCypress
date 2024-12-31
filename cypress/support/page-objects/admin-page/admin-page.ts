import ApiHelper from "../../helpers/api-helper";
import CommonHelper from "../../helpers/common-helper";
import { API_URLS, PAGES } from "../../helpers/constatns";
import WebElementsHandler from "../../helpers/web-elements-handler";

export const LABELS = {
  admin: "Admin",
  add: "Add",
  userRole: "User Role",
  status: "Status",
  employeeName: "Employee Name",
  username: "Username",
  password: "Password",
  confirmPassword: "Confirm Password",

  actions: "Actions",
  search: "Search",
  reset: "Reset",
  save: "Save",
};

export const LOCATORS = {
  userFormHeader: ".user-form-header",
  inputGroup: ".oxd-input-group",

  dropdownOptions: ".oxd-select-dropdown",
  dropdownArrow: ".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow", // Locator to open dropdown

  employeeNameInput: 'input[placeholder="Type for hints..."]',
  autocompleteDropdown: ".oxd-autocomplete-dropdown",
  autocompleteOption: ".oxd-autocomplete-option",

  employeeNameField: ".oxd-autocomplete-wrapper",
  userRoleDropdown: ".oxd-select-wrapper",
  statusDropdown: ".oxd-select-wrapper",

  records: "[data-v-5a621acd]",

  table: ".oxd-table-body",
  tableRow: ".oxd-table-body .oxd-table-row",
  tableCell:".oxd-table-cell",
  //oxd-table

  // Buttons
  addButton:
    'button[data-v-10d463b7][class="oxd-button oxd-button--medium oxd-button--secondary"]',
  resetButton: ".oxd-button--ghost",
  searchButton: ".oxd-button--secondary",
};

const tableHeader = [
  LABELS.username,
  LABELS.userRole,
  LABELS.employeeName,
  LABELS.actions,
  LABELS.status,
];


export default class AdminPage {
  static visit(visitBaseUrl: boolean = false) {
    if (visitBaseUrl) cy.visit("/");

    const aliasName = CommonHelper.generate_random_string(LABELS.admin, 10);
    ApiHelper.intercept_with_alias_name(API_URLS.ADMIN, undefined, aliasName);
    WebElementsHandler.visit_page(PAGES.ADMIN);
  }

  static click_on_add() {
    WebElementsHandler.click_on_element_by_locator(LOCATORS.addButton);
  }

 

}
