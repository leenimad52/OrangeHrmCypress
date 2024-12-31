import ApiHelper from "../../helpers/api-helper"
import CommonHelper from "../../helpers/common-helper"
import { API_URLS, PAGE_URLS } from "../../helpers/constatns"
import PimPage from "./pim-page"

export default class AddEmployeeDialog extends PimPage {

    static visit() {
        const aliasName = CommonHelper.generate_random_string('PimPage')
        ApiHelper.intercept_with_alias_name(API_URLS.PIM_EMPLOYEES, undefined, aliasName)

        cy.visit(PAGE_URLS.ADD_EMPLOYEE)

        cy.wait(`@${aliasName}`).then(({ response }) => {
            expect(response.statusCode).to.eq(200)
        })
    }
}