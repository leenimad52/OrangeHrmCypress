import CommonHelper from "../../support/helpers/common-helper";
import WebElementsHandler, {
  ADMIB_TABLE_HEADERS,
  keyValue,
} from "../../support/helpers/web-elements-handler";
import AddUserDialog, {
  IUserDetails,
} from "../../support/page-objects/admin-page/add-user-dialog";
import AdminPage from "../../support/page-objects/admin-page/admin-page";
import SearchUserDialog from "../../support/page-objects/admin-page/search-user-dialog";

// const userInfo = {
//  // username:"Admin",
//   userRole: "Admin",
// };

beforeEach(() => {
  cy.login();
  AdminPage.visit();
});

export interface userDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
}

const userDetails: IUserDetails = {
  userRole: "Admin",
  status: "Enabled",
  employeeName: "manda",
  username: "Admin",
  password: "",
  confirmpassword: "",
};
const validationData: keyValue = {
  [ADMIB_TABLE_HEADERS.USER_NAME]: userDetails.username,
  [ADMIB_TABLE_HEADERS.USER_ROLE]: userDetails.userRole,
  [ADMIB_TABLE_HEADERS.EMP_NAME]: userDetails.employeeName,
  [ADMIB_TABLE_HEADERS.STATUS]: userDetails.status,
};

describe("Admin page test cases ", () => {
  it("check search functionality", () => {
    SearchUserDialog.fill_form(userDetails);
    SearchUserDialog.click_search_button();

    WebElementsHandler.validate_table_row(validationData);
  });

  it("check reset functionality", () => {
    SearchUserDialog.fill_form(userDetails);
    SearchUserDialog.click_reset_button();
  });

  it.only("Check add new user functionality", () => {
    AdminPage.click_on_add();

    AddUserDialog.fill_user_details({
      userRole: "Admin",
      status: "Enabled",
      employeeName: "l",
      username: CommonHelper.generate_random_string(undefined, 7),
      password: "SecureP@ss456",
      confirmpassword: "SecureP@ss456",
    });

    AddUserDialog.click_on_save_button();
    WebElementsHandler.validate_success_alert();

    SearchUserDialog.fill_form({
      username: CommonHelper.generate_random_string(undefined, 7),
      userRole: "Admin",
      employeeName: "l",
      status: "Enabled",
    });
    SearchUserDialog.click_search_button();
  });
});
