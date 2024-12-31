import WebElementsHandler from "../../helpers/web-elements-handler"
import PimPage, { BASE_LABELS, BASE_LOCATORS, EmployeeDetails, LOCATORS as PIM_LOCATORS } from "./pim-page"

export enum DETAILS_TABS {
    PERSONAL_DETAILS = 'Personal Details',
    CONTACT_DETAILS = 'Contact Details'
}

export const LOCATORS = {
    tab: '.orangehrm-tabs-wrapper',
    employeeName: '.orangehrm-edit-employee-name'

}

export const LABELS = {
    otherId: 'Other Id',
    drivingLicenseNo: 'Driver\'s License Number',
    licenseExpiryDate: 'License Expiry Date',
    nationality: 'Nationality',
    maritalStatus: 'Marital Status',
    dob: 'Date of Birth',
    gender: 'Gender',

    employeeOtherId: 'Other Id',
    licenseNumber: 'License Number',
    dateOfBirth: 'Date of Birth',
    bloodType: 'Blood Type',
    testField: 'Test_Field',
    add: 'Add',
    comment: 'Comment'
}

export interface EmployeePersonalDetails {
    firstName?: string,
    middleName?: string,
    lastName?: string,
    employeeId?: string,
    otherId?: string,
    licenseNumber?: string,
    licenseExpiryDate?: string,
    nationality?: string,
    maritalStatus?: string,
    dateOfBirth?: string,
    gender?: string
}

export interface EmployeeCustomFields {
    bloodType?: string,
    testField?: string
}

export default class EditEmployeeDialog extends PimPage {

    static validate_employee_details(empDetails: EmployeeDetails) {
        WebElementsHandler.validate_element_value(LOCATORS.employeeName, `${empDetails.firstName} ${empDetails.lastName}`)

        cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.employeeFullName).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.firstName, empDetails.firstName)
            WebElementsHandler.validate_input_value(BASE_LOCATORS.middleName, empDetails.middleName)
            WebElementsHandler.validate_input_value(BASE_LOCATORS.lastName, empDetails.lastName)
        })

        cy.contains(BASE_LOCATORS.inputGroup, BASE_LABELS.employeeId).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.input, empDetails.employeeId)
        })
    }

    static fill_personal_details(empPersonalDetails?: EmployeePersonalDetails) {
        const empDetails: EmployeeDetails = {
            firstName: empPersonalDetails.firstName,
            middleName: empPersonalDetails.middleName,
            lastName: empPersonalDetails.lastName,
            employeeId: empPersonalDetails.employeeId
        }
        super.fill_employee_details(empDetails)

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.employeeOtherId).within(() => {
            WebElementsHandler.fill_input_field(BASE_LOCATORS.input, empPersonalDetails.otherId)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.licenseNumber).within(() => {
            WebElementsHandler.fill_input_field(BASE_LOCATORS.input, empPersonalDetails.licenseNumber)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.licenseExpiryDate).within(() => {
            WebElementsHandler.fill_date_input_field(empPersonalDetails.licenseExpiryDate)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.nationality).within(() => {
            WebElementsHandler.select_option(empPersonalDetails.nationality)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.maritalStatus).within(() => {
            WebElementsHandler.select_option(empPersonalDetails.maritalStatus)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.dateOfBirth).within(() => {
            WebElementsHandler.fill_date_input_field(empPersonalDetails.dateOfBirth)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.gender).within(() => {
            WebElementsHandler.select_option(empPersonalDetails.gender, true)
        })
    }

    static fill_custom_fields(empCustomFields: EmployeeCustomFields) {
        cy.contains(BASE_LOCATORS.inputGroup, LABELS.bloodType).within(() => {
            WebElementsHandler.select_option(empCustomFields.bloodType)
        })
        cy.contains(BASE_LOCATORS.inputGroup, LABELS.testField).within(() => {
            WebElementsHandler.fill_input_field(undefined, empCustomFields.testField)
        })
    }

    static validate_personal_details(empPersonalDetails: EmployeePersonalDetails) {
        cy.contains(BASE_LOCATORS.inputGroup, LABELS.employeeOtherId).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.input, empPersonalDetails.otherId)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.licenseNumber).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.input, empPersonalDetails.licenseNumber)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.licenseExpiryDate).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.input, empPersonalDetails.licenseExpiryDate)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.nationality).within(() => {
            WebElementsHandler.validate_selected_option(empPersonalDetails.nationality)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.maritalStatus).within(() => {
            WebElementsHandler.validate_selected_option(empPersonalDetails.maritalStatus)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.dateOfBirth).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.input, empPersonalDetails.dateOfBirth)
        })

        cy.contains(BASE_LOCATORS.inputGroup, LABELS.gender).within(() => {
            WebElementsHandler.validate_selected_option(empPersonalDetails.gender, true)
        })
    }

    static validate_custom_fields(empCustomFields: EmployeeCustomFields) {
        cy.contains(BASE_LOCATORS.inputGroup, LABELS.bloodType).within(() => {
            WebElementsHandler.validate_selected_option(empCustomFields.bloodType)
        })
        cy.contains(BASE_LOCATORS.inputGroup, LABELS.testField).within(() => {
            WebElementsHandler.validate_input_value(BASE_LOCATORS.input, empCustomFields.testField)
        })
    }


}