import { HTTPS_METHODS, apiBaseUrl } from "./constatns";

export default class ApiHelper {

    static intercept_with_alias_name(url: string, method: HTTPS_METHODS = HTTPS_METHODS.GET, aliasName: string) {
        cy.intercept({
            url: apiBaseUrl + url,
            method
        }).as(aliasName)
    }

}