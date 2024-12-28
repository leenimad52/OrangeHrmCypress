import WebElementsHandler from "../../helpers/web-elements-handler"
import AddEmployeeDialog, { IEmployeeDetails } from "./add-emp-dialog"
import { LOCATORS as PIM_LOCATORS } from "./pim-page"

export enum DETAILS_TABS {
    PERSONAL_DETAILS = 'Personal Details',
    CONTACT_DETAILS = 'Contact Details'
}

export const LOCATORS = {
    tab: '.orangehrm-tabs-wrapper'
}

export const LABELS = {
    otherId: 'Other Id',
    drivingLicenseNo: 'Driver\'s License Number',
    licenseExpiryDate: 'License Expiry Date',
    nationality: 'Nationality',
    maritalStatus: 'Marital Status',
    dob: 'Date of Birth',
    gender: 'Gender'
}

export default class EditEmployeeDialog {

    static select_tab(tabName: DETAILS_TABS) {
        WebElementsHandler.click_on_element_by_content(LOCATORS.tab, tabName)
        WebElementsHandler.wait_until_it_finished()
    }

    static fill_personal_details(employeeDetails: IEmployeeDetails) {
        AddEmployeeDialog.fill_employee_details(employeeDetails)

        WebElementsHandler.within_specific_container_content(PIM_LOCATORS.inputGroup, LABELS.otherId, () => {
            WebElementsHandler.fill_input_field(undefined, employeeDetails.otherId)
        })
        WebElementsHandler.within_specific_container_content(PIM_LOCATORS.inputGroup, LABELS.drivingLicenseNo, () => {
            WebElementsHandler.fill_input_field(undefined, employeeDetails.drivingLicenseNo)
        })
        WebElementsHandler.within_specific_container_content(PIM_LOCATORS.inputGroup, LABELS.licenseExpiryDate, () => {
            WebElementsHandler.fill_date_field(employeeDetails.drivingLicenseExpiredDate)
        })
    }

}