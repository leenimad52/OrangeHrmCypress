import CommonHelper from "../../support/helpers/common-helper";
import WebElementsHandler from "../../support/helpers/web-elements-handler";
import AddUserDialog from "../../support/page-objects/admin-page/add-user-dialog";
import AdminPage from "../../support/page-objects/admin-page/admin-page";
import SearchUserDialog from "../../support/page-objects/admin-page/search-user-dialog";


beforeEach(() => {
  cy.login();
  AdminPage.visit();
});

describe("Admin page test cases ", () => {

  it("check search functionality",()=>{
    SearchUserDialog.fill_form(
      {
        username: "l",
        userRole: "Admin",
        employeeName: "l",
        status: "Enabled"
      }
    )
    SearchUserDialog.click_search_button();
  })

  it("check reset functionality",()=>{
    SearchUserDialog.fill_form(
      {
         username: "l",
        userRole: "Admin",
        employeeName: "l",
        status: "Enabled"
      }
    )
    SearchUserDialog.click_reset_button();
  })

  // it("Check table-validation",()=>{
  //   SearchUserDialog.fill_form(
  //     {
  //       username: "Admin",
  //       userRole: "Admin",
  //       employeeName: "manda",
  //       status: "Enabled"
  //     }
  //   )
  //   SearchUserDialog.click_search_button();
  //   SearchUserDialog.table_validation();

  // })

  it.only("Check add new user functionality", () => {

    AdminPage.click_on_add();

    AddUserDialog.fill_user_details({
      userRole: "Admin",
      status: "Enabled",
      employeeName: "l",
      username: CommonHelper.generate_random_string(undefined, 7),
      password: "SecureP@ss456",
    });

    AddUserDialog.click_on_save_button();
    WebElementsHandler.validate_success_alert();

    SearchUserDialog.fill_form(
      {
        username: CommonHelper.generate_random_string(undefined, 7),
        userRole: "Admin",
        employeeName: "l",
        status: "Enabled"
      }
    )
    SearchUserDialog.click_search_button();

  });

});
