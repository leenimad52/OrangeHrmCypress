import LoginPage, { ALERT_MSGS } from "../../support/page-objects/login-page"

describe('Login Page', () => {

  let usersInfo: any = {} //empty variable that will store user data

  before(() => {
    cy.fixture("users").then(usersData => { 
      usersInfo = usersData
    })
  })


  it('Login - Check valid username and valid password', () => {
    LoginPage.fill_username_field(usersInfo.validUser.username)
    LoginPage.fill_password_field(usersInfo.validUser.password)
    LoginPage.click_on_login()
    LoginPage.validate_login_success()  
  })

  it('Login - Check valid username and invalid password', () => {
    LoginPage.fill_username_field(usersInfo.validUser.username)
    LoginPage.fill_password_field(usersInfo.invalidUser.password)
    LoginPage.click_on_login()
    LoginPage.validate_alert_msg(true, ALERT_MSGS.INVALID_CREDENTIALS)
  })

  it('Login - Check invalid username and valid password', () => {
    LoginPage.fill_username_field(usersInfo.invalidUser.username)
    LoginPage.fill_password_field(usersInfo.validUser.password)
    LoginPage.click_on_login()
    LoginPage.validate_alert_msg(true, ALERT_MSGS.INVALID_CREDENTIALS)
  })

  it('Login - Check invalid username and invalid password', () => {
    LoginPage.fill_username_field(usersInfo.invalidUser.username)
    LoginPage.fill_password_field(usersInfo.invalidUser.password)
    LoginPage.click_on_login()
    LoginPage.validate_alert_msg(true, ALERT_MSGS.INVALID_CREDENTIALS)
  })

  it('Login - Check valid username and empty password', () => {
    LoginPage.fill_username_field(usersInfo.validUser.username)
    LoginPage.fill_password_field('')
    LoginPage.click_on_login()
    LoginPage.validate_alert_msg(false)
    LoginPage.validate_required_field(LoginPage.LOCATORS.passwordInput)
  })

  it('Login - Check empty username and invalid password', () => {
    LoginPage.fill_username_field('')
    LoginPage.fill_password_field(usersInfo.invalidUser.password)
    LoginPage.click_on_login()
    LoginPage.validate_alert_msg(false)
    LoginPage.validate_required_field(LoginPage.LOCATORS.usernameInput)
  })

  it('Login - Check password visibility', () => {
    LoginPage.fill_password_field(usersInfo.validUser.password)
    LoginPage.validate_password_visibility()
  })

})