import { da, he } from "@faker-js/faker/.";
import AdminPage from "../page-objects/admin-page/admin-page";
import CommonHelper from "./common-helper";
import { PAGES, HTML_TAGS, ASSERTION } from "./constatns";

export type keyValue = {
  [key: string]: string
}
export enum PIM_TABLE_HEADERS {
  ID = 'Id',
  FIRSTnMiddle_NAME = 'First (& Middle) Name',
  LAST_NAME = 'Last Name',
  JOB_TITLE = 'Job Title',
  EMPLOYMENT_STATUS = 'Employment Status',
  SUB_UNIT = 'Sub Unit',
  SUPERVISOR = 'Supervisor'
}

export enum ADMIB_TABLE_HEADERS {
  USER_NAME = 'Username',
  USER_ROLE = 'User Role',
  EMP_NAME = 'Employee Name',
  STATUS = 'Status',
 
}
/* LABELS.username,
  LABELS.userRole,
  LABELS.employeeName,
  LABELS.actions,
  LABELS.status,*/

export default class WebElementsHandler {
  static LOCATORS = {
    mainMenu: "oxd-main-menu",
    loader: ".oxd-loading-spinner-container",
    loggedInUser: "oxd-userdropdown-name",
    successAlert: "oxd-toast--success",
    switch: ".oxd-switch-wrapper",
    dateInput: "oxd-date-input",
    dateInputIcon: ".oxd-date-input-icon",
    calendarDate: "oxd-calendar-date-wrapper",
    calendarCloseBtn: "--close",

    radio: '.oxd-radio-wrapper',
    radioInput: '.oxd-radio-input',
    selectedOption: '.oxd-select-text-input',


    calendarDatesGrid: 'oxd-calendar-dates-grid',
    calendarWindow: 'oxd-calendar-wrapper',
    closeCalendar: '.--close',
    activeDate: 'oxd-calendar-date-wrapper',
    dropDownIcon: '.oxd-select-text--arrow',
    listBox: '[role="listbox"]',
    fileInput: 'input[type="file"]',
   
   // table: ".oxd-table",
    tableHeader: "oxd-table-header",
    tableBody: 'class="oxd-table-body"',
    tableRow: "oxd-table-row oxd-table-row--with-border",
    tableCell: "oxd-table-cell oxd-padding-cell",


    ////
    option: '[role="option"]',
    table: '[role="table"]',
    columnHeader: '[role="columnheader"]',
    cell: '[role="cell"]',
    tableCard: '.oxd-table-card',
  };

  

  static visit_page(pageName: PAGES) {
    cy.get_by_class(this.LOCATORS.mainMenu)
      .contains(HTML_TAGS.li, pageName)
      .click();
  }

  static fill_input_field(locator: string = HTML_TAGS.input, value: string) {
    if (value) cy.get(locator).clear().type(value, { force: true });
  }

  // static fill_date_field(value?: string) {
  //   if (value) {
  //     cy.get_by_class(this.LOCATORS.dateInput).type(value);
  //     cy.get_by_class(this.LOCATORS.calendarCloseBtn).click();
  //   } else {
  //     cy.get(this.LOCATORS.dateInputIcon).click();
  //     cy.get_by_class(this.LOCATORS.calendarDate)
  //       .filter((_, el) => el.className === this.LOCATORS.calendarDate)
  //       .then(($el) => {
  //         cy.wrap($el)
  //           .eq(CommonHelper.generate_random_number(0, $el.length - 1))
  //           .click();
  //       });
  //   }
  // }

  static click_on_element_by_locator(elLocator: string, byForce: boolean = false, index: number = 0) {
    cy.get(elLocator).eq(index).click({ force: byForce })
}

  static click_on_element_by_contains_text(elLocator: string, text: string) {
    cy.get(elLocator).contains(text).click()
}
  static click_on_element_by_content(locator: string, value: string) {
    cy.contains(locator, value).click();
  }

  static toggle_switch_button() {
    this.click_on_element_by_locator(this.LOCATORS.switch);
  }

  static wait_until_it_finished() {
    cy.get(this.LOCATORS.loader, { timeout: 5000 }).should("not.exist");
  }

  static get_logged_in_user() {
    return cy.get_by_class(this.LOCATORS.loggedInUser).invoke("text");
  }

  static within_specific_container_content(locator: string, label: string, fn) {
    cy.contains(locator, label).within(fn);
  }

  static validate_success_alert() {
    cy.get_by_class(this.LOCATORS.successAlert).should("exist");
    this.wait_until_it_finished();
  }

  static validate_required_field(locator: string) {
    cy.get(locator).should("have.css", "border-color", "rgb(235, 9, 16)");
  }

  static clear_field(locator: string) {
    cy.get(locator).clear();
  }

  static validate_input_value(locator: string, value: string) {
    cy.get(locator).should('have.value', value)
}

  static get_header_index(headerName: string) {
    return new Cypress.Promise<number>(resolve => {
        cy.get(this.LOCATORS.table).find(this.LOCATORS.columnHeader).contains(headerName).invoke('index').then((index) => {
            resolve(index)
        })
    })
}

static validate_selected_option(option: string, radio: boolean = false) {
  if (radio) {
      cy.contains(this.LOCATORS.radio, option).within(() => {
          cy.get(this.LOCATORS.radioInput).should('have.css', 'box-shadow', 'rgb(255, 123, 29) 0px 0px 0px 4.8px inset')
      })
  } else
      cy.get(this.LOCATORS.selectedOption).should('have.text', option)
}

static validate_element_value(locator: string, value: string) {
  cy.get(locator).should('text', value)
}

static fill_date_input_field(date?: string) {
  if (date) {
      cy.get_by_class(this.LOCATORS.dateInput).find(HTML_TAGS.input).type(date)
      cy.get_by_class(this.LOCATORS.calendarWindow).find(this.LOCATORS.closeCalendar).click()
  } else {
      cy.get_by_class(this.LOCATORS.dateInput).find(this.LOCATORS.dateInputIcon).click()
      cy.get_by_class(this.LOCATORS.calendarDatesGrid).find(`.${this.LOCATORS.activeDate}`).filter((_, el) => el.className === this.LOCATORS.activeDate).then($dates => {
          cy.wrap($dates.get(Math.floor(Math.random() * $dates.length))).click()
      })
  }
}

static select_option(option: string, radio: boolean = false) {
  if (option) {
      if (radio)
          cy.contains(this.LOCATORS.radio, option).click()
      else {
          cy.get(this.LOCATORS.dropDownIcon).click()
          cy.get(this.LOCATORS.listBox).contains(this.LOCATORS.option, option).click()
      }
  }
}
/////////////////

static validate_table_row(validationData: keyValue) {
    const rowsIndicesMap: Map<string, number[]> = new Map()
    const keys = Object.keys(validationData)

    Object.entries(validationData).forEach(([key, value]) => {
        rowsIndicesMap.set(key, [])
        this.get_header_index(key).then(hIndex => {
            cy.get(this.LOCATORS.table).find(this.LOCATORS.tableCard).each(($card, index) => {
                cy.wrap($card).find(this.LOCATORS.cell).then(($cells) => {
                    cy.wrap($cells[hIndex]).invoke('text').then((text) => {
                        if (text === value)
                            rowsIndicesMap.set(key, [...rowsIndicesMap.get(key), index])
                    })
                })
            })
        })
    })

    cy.then(() => {
        let commonIndices = rowsIndicesMap.get(keys[0])
        keys.forEach(key => {
            const indices = rowsIndicesMap.get(key)
            if (!commonIndices.length || !indices.length)
                throw new Error('No matching rows found')

            commonIndices = commonIndices.filter((index) => indices.includes(index))
        })

        if (!commonIndices.length)
            throw new Error('No matching rows found')
        if (commonIndices.length > 1)
            throw new Error('Multiple matching rows found')
        if (commonIndices.length === 1) {
            cy.get(this.LOCATORS.table).find(this.LOCATORS.tableCard).eq(commonIndices[0]).find(this.LOCATORS.cell).then(($cells) => {
                Object.entries(validationData).forEach(([key, value]) => {
                    this.get_header_index(key).then(hIndex => {
                        cy.wrap($cells).eq(hIndex).should('have.text', value)
                    })
                })
            })
        }
    })
}

}