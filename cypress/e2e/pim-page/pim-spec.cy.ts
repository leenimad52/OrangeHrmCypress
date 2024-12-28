import { faker } from '@faker-js/faker';
import CommonHelper from "../../support/helpers/common-helper";
import AddEmployeeDialog, { IEmployeeDetails, IEmployeeLoginDetails } from "../../support/page-objects/pim-page/add-emp-dialog";
import PimPage from "../../support/page-objects/pim-page/pim-page";
import moment = require('moment');
import EditEmployeeDialog, { DETAILS_TABS } from '../../support/page-objects/pim-page/edit-emp-dialog';

describe("PIM page test cases", () => {

    beforeEach(() => {
        cy.login();
        PimPage.visit();
    });

    it("PIM - Add Employee Without Login Details", () => {
        PimPage.click_on_add_employee();

        const empInfo: IEmployeeDetails = {
            firstName: CommonHelper.generate_random_string(undefined, 7),
            lastName: CommonHelper.generate_random_string(undefined, 8),
            employeeId: faker.string.uuid().substring(0, 10),

            otherId: faker.string.uuid().substring(0, 10),
            drivingLicenseNo: CommonHelper.generate_random_number() + CommonHelper.generate_random_string(undefined, 10),
            drivingLicenseExpiredDate: moment().format('YYYY-DD-MM'),
            nationality: 'Afghan',
            maritalStatus: ['Single', 'Married', 'Other'][CommonHelper.generate_random_number(0, 2)],
            birthday: moment().subtract(CommonHelper.generate_random_number(15, 20)).format('YYYY-DD-MM'),
            gender: ['Male', 'Female'][CommonHelper.generate_random_number(0, 1)]
        };

        AddEmployeeDialog.fill_employee_details(empInfo, null); // No login details 
        AddEmployeeDialog.click_on_save_button();

        // Assert successful save
        cy.contains('Employee successfully added').should('be.visible');
    });


    it("PIM - Add Valid Employee with Login Details", () => {
        PimPage.click_on_add_employee();

        const empInfo: IEmployeeDetails = {
            firstName: CommonHelper.generate_random_string(undefined, 7),
            middleName: CommonHelper.generate_random_string(undefined, 30),
            lastName: CommonHelper.generate_random_string(undefined, 8),
            employeeId: faker.string.uuid().substring(0, 10),

            otherId: faker.string.uuid().substring(0, 10),
            drivingLicenseNo: CommonHelper.generate_random_number() + CommonHelper.generate_random_string(undefined, 10),
            drivingLicenseExpiredDate: moment().format('YYYY-DD-MM'),
            nationality: 'Afghan',
            maritalStatus: ['Single', 'Married', 'Other'][CommonHelper.generate_random_number(0, 2)],
            birthday: moment().subtract(CommonHelper.generate_random_number(15, 20)).format('YYYY-DD-MM'),
            gender: ['Male', 'Female'][CommonHelper.generate_random_number(0, 1)]
        };

        const empLoginDetails: IEmployeeLoginDetails = {
            username: CommonHelper.generate_random_string(undefined, 7),
            password: CommonHelper.generate_random_string('P1', 8)
        };
        AddEmployeeDialog.fill_employee_details(empInfo, empLoginDetails);
        AddEmployeeDialog.click_on_save_button();

        EditEmployeeDialog.select_tab(DETAILS_TABS.PERSONAL_DETAILS);
        EditEmployeeDialog.fill_personal_details(empInfo);
    });

///////////////////////////////////
it("PIM - Add Employee Without Middle Name", () => {
    PimPage.click_on_add_employee();

    const empInfo: IEmployeeDetails = {
        firstName: CommonHelper.generate_random_string(undefined, 7),
        lastName: CommonHelper.generate_random_string(undefined, 8),
        employeeId: faker.string.uuid().substring(0, 10),
    };

    const empLoginDetails: IEmployeeLoginDetails = {
        username: CommonHelper.generate_random_string(undefined, 7),
        password: CommonHelper.generate_random_string('P1', 8)
    };

    AddEmployeeDialog.fill_employee_details(empInfo, empLoginDetails);
    AddEmployeeDialog.click_on_save_button();

    EditEmployeeDialog.select_tab(DETAILS_TABS.PERSONAL_DETAILS);
    EditEmployeeDialog.fill_personal_details(empInfo);
});   
///////////////////////////////////
it.only("PIM - Add Employee with Duplicate ID", () => {
    PimPage.click_on_add_employee();

    const duplicateId = "0430"; // Example of a duplicate ID

    const empInfo: IEmployeeDetails = {
        firstName: CommonHelper.generate_random_string(undefined, 7),
        lastName: CommonHelper.generate_random_string(undefined, 8),
        employeeId: duplicateId, // Using a duplicate ID
    };

    const empLoginDetails: IEmployeeLoginDetails = {
        username: CommonHelper.generate_random_string(undefined, 7),
        password: CommonHelper.generate_random_string('P1', 8)
    };

    AddEmployeeDialog.fill_employee_details(empInfo, empLoginDetails);
    AddEmployeeDialog.click_on_save_button();
    
    AddEmployeeDialog.validate_required_field(duplicateId)
    // Validate error message
    cy.contains("Employee ID already exists").should('be.visible');
});
});
