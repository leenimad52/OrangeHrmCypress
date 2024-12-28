import WebElementsHandler from "../../support/helpers/web-elements-handler"
import { ASSERTION, CSS_SELECTORS } from "../helpers/constatns"

export enum ALERT_MSGS {
    INVALID_CREDENTIALS = "Invalid credentials"
}

export default class LoginPage {

    static URLS = {
      apiBaseUrl: '/web/index.php/api/v2'
    }

    static LABELS = {
        DASHBOARD: 'Dashboard',
        PASSWORD:'password'
    }

    static LOCATORS = {
        usernameInput: '[name=username]',
        passwordInput: '[name=password]',
        loginBtn: '[type=submit]',
        alertMsg: '.orangehrm-login-form .oxd-alert',
        pageHeader: 'oxd-topbar-header-title'
    }

    static fill_username_field(username: string) {
        WebElementsHandler.fill_input_field(this.LOCATORS.usernameInput, username)
    }

    static fill_password_field(password: string) {
        WebElementsHandler.fill_input_field(this.LOCATORS.passwordInput, password)
    }

    static click_on_login() {
        WebElementsHandler.click_on_element_by_locator(this.LOCATORS.loginBtn)
    }

    static validate_alert_msg(shouldExist: boolean = true, alertMsg?: string) {
        cy.get(this.LOCATORS.alertMsg).should(shouldExist ? ASSERTION.Be_Visible : ASSERTION.Not_Exist)

        if (shouldExist) {
            cy.get(this.LOCATORS.alertMsg).contains(alertMsg)
        }
    }

    static validate_required_field(locator: string) {
        cy.get(locator).should(ASSERTION.Have_css, CSS_SELECTORS.Border_color, CSS_SELECTORS.Red_Color)
    }

    static validate_login_success() {
        cy.get_by_class(this.LOCATORS.pageHeader).should(ASSERTION.Have_Text, this.LABELS.DASHBOARD)
    }

    static validate_password_visibility() {
        cy.get(this.LOCATORS.passwordInput).should(ASSERTION.Have_Attr, ASSERTION.Type, this.LABELS.PASSWORD)
    }

}