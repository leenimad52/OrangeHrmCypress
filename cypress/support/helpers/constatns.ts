export const apiBaseUrl = '/web/index.php/api/v2'

export enum PAGES {
    DASHBOARD = "Dashboard",
    ADMIN = "Admin",
    PIM = "PIM"
}

export const ASSERTION={
Be_Visible:'be.visible',
Not_Exist:'not.be.exist',
Have_css:'have.css',
Have_Text:'have.text',
Have_Attr:'have.attr',
Type:'type'
}

export const CSS_SELECTORS={
    Red_Color: 'rgb(235, 9, 16)',
    Border_color: 'border-color'    
}

export const HTML_TAGS = {
    li: 'li',
    input: 'input',
    button: 'button',
    div:"div"
    
}

export enum API_URLS {
    PIM_EMPLOYEES = '/pim/employees*',
    ADMIN='/admin/viewSystemUsers*'
}

export enum HTTPS_METHODS {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH'
}
