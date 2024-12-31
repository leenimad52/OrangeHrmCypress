import moment = require("moment")
import CommonHelper from "../../support/helpers/common-helper"
import { PAGES } from "../../support/helpers/constatns"
import WebElementsHandler, { keyValue, PIM_TABLE_HEADERS } from "../../support/helpers/web-elements-handler"
import AddEmployeeDialog from "../../support/page-objects/pim-page/add-emp-dialog"
import EditEmployeeDialog, { EmployeePersonalDetails, EmployeeCustomFields } from "../../support/page-objects/pim-page/edit-emp-dialog"
import PimPage, { PIM_TABS, EmployeeDetails } from "../../support/page-objects/pim-page/pim-page"


describe('Personnel Information Management Page', () => {

    beforeEach(() => {
        cy.login()

        PimPage.visit(true)
    })

    it('PIM - Add Employee UI', () => {
        PimPage.select_tab(PIM_TABS.ADD_EMPLOYEE)

        const empDetails: EmployeeDetails = {
            firstName: "leen",
            middleName:"imad",
            lastName: "soud",
            employeeId: CommonHelper.generate_random_number(1000, 9999, 'empId_')
        }

        const empLoginDetails = {
            username:CommonHelper.generate_random_string(undefined, 7),
            password: "Leen@123"
        }

        AddEmployeeDialog.fill_employee_details(empDetails, empLoginDetails)
        AddEmployeeDialog.click_on_save_button()
        AddEmployeeDialog.validate_success_alert()

        EditEmployeeDialog.validate_employee_details(empDetails)

        const empPersonalDetails: EmployeePersonalDetails = {
            otherId: "",
            licenseNumber: "",
            licenseExpiryDate: moment().format('YYYY-DD-MM'),
            nationality: 'Afghan',
            maritalStatus: ['Single', 'Married', 'Other'][CommonHelper.generate_random_number(0, 2)],
            dateOfBirth: moment().subtract(CommonHelper.generate_random_number(18, 60), 'years').format('YYYY-DD-MM'),
            gender: ['Male', 'Female'][CommonHelper.generate_random_number(0, 1)]
        }
        EditEmployeeDialog.fill_personal_details(empPersonalDetails)
        EditEmployeeDialog.click_on_save_button()
        EditEmployeeDialog.validate_success_alert()

        const empCustomFields: EmployeeCustomFields = {
            bloodType: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'][CommonHelper.generate_random_number(0, 7)],
            testField: CommonHelper.generate_random_string('test_')
        }
        EditEmployeeDialog.fill_custom_fields(empCustomFields)
        EditEmployeeDialog.click_on_save_button()
        EditEmployeeDialog.validate_success_alert()

        EditEmployeeDialog.click_on_save_button()

        EditEmployeeDialog.validate_success_alert()

        PimPage.visit()
        const validationData: keyValue = {
            [PIM_TABLE_HEADERS.ID]: empDetails.employeeId,
            [PIM_TABLE_HEADERS.FIRSTnMiddle_NAME]: `${empDetails.firstName} ${empDetails.middleName}`,
            [PIM_TABLE_HEADERS.LAST_NAME]: empDetails.lastName,
            [PIM_TABLE_HEADERS.JOB_TITLE]: ''
        }
        WebElementsHandler.validate_table_row(validationData)
    })


     it("PIM - Add Employee Without Login Details", () => {

        
    });
    it("PIM - Add Employee Without Middle Name", () => {})
    it("PIM - Add Employee with Duplicate ID", () => {})


})