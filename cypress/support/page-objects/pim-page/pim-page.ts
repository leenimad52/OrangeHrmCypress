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

export const BASE_LOCATORS = {
    navTabs: '.oxd-topbar-body-nav-tab',
    inputGroup: '.oxd-input-group',
    input: '.oxd-input',
    firstName: 'input[name="firstName"]',
    middleName: 'input[name="middleName"]',
    lastName: 'input[name="lastName"]',
    userFormHeader: '.user-form-header',
    checkbox: 'input[type="checkbox"]',
    saveBtn: 'button[type="submit"]',
    downloadBtn: '.bi-download'
}

export const BASE_LABELS = {
    employeeFullName: 'Employee Full Name',
    employeeId: 'Employee Id',
    createLoginDetails: 'Create Login Details',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password'
}

export enum PIM_TABS {
    EMPLOYEE_LIST = 'Employee List',
    ADD_EMPLOYEE = 'Add Employee',
    REPORTS = 'Reports'
}

export interface EmployeeDetails {
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string
}

export interface EmployeeLoginDetails {
    username: string,
    password: string
}

export default class PimPage {

    static visit(visitBaseUrl: boolean = false) {
        if (visitBaseUrl)
            cy.visit('/')
        const aliasName = CommonHelper.generate_random_string('PimPage')
        ApiHelper.intercept_with_alias_name(API_URLS.PIM_EMPLOYEES, undefined, aliasName)

        WebElementsHandler.visit_page(PAGES.PIM)

        cy.wait(`@${aliasName}`).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }

    static select_tab(tabName: PIM_TABS) {
        WebElementsHandler.click_on_element_by_contains_text(BASE_LOCATORS.navTabs, tabName)
        WebElementsHandler.wait_until_it_finished()
    }

    static fill_employee_details(empDetails: EmployeeDetails, empLoginDetails?: EmployeeLoginDetails) {
        cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.employeeFullName).within(() => {
            WebElementsHandler.fill_input_field(BASE_LOCATORS.firstName, empDetails.firstName)
            WebElementsHandler.fill_input_field(BASE_LOCATORS.middleName, empDetails.middleName)
            WebElementsHandler.fill_input_field(BASE_LOCATORS.lastName, empDetails.lastName)
        })

        cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.employeeId).within(() => {
            WebElementsHandler.fill_input_field(BASE_LOCATORS.input, empDetails.employeeId)
        })

        if (empLoginDetails) {
            cy.contains(BASE_LOCATORS.userFormHeader, BASE_LABELS.createLoginDetails).within(() => {
                WebElementsHandler.click_on_element_by_locator(BASE_LOCATORS.checkbox, true)
            })

            cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.username).within(() => {
                WebElementsHandler.fill_input_field(BASE_LOCATORS.input, empLoginDetails.username)
            })

            cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.password).within(() => {
                WebElementsHandler.fill_input_field(BASE_LOCATORS.input, empLoginDetails.password)
            })

            cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.confirmPassword).within(() => {
                WebElementsHandler.fill_input_field(BASE_LOCATORS.input, empLoginDetails.password)
            })
        }
    }

    static click_on_save_button(index?: number) {
        WebElementsHandler.click_on_element_by_locator(BASE_LOCATORS.saveBtn, undefined, index)
        WebElementsHandler.wait_until_it_finished()
    }

    static validate_success_alert() {
        WebElementsHandler.validate_success_alert()
        WebElementsHandler.wait_until_it_finished()
    }

}