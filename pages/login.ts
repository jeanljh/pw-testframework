import { Page } from '@playwright/test'

export class Login {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    inputEmail = () => this.page.locator('input[type="email"]')
    btnEmailNext = () => this.page.locator('#identifierNext')
    inputPwd = () => this.page.locator('input[type="password"]')
    btnPwdNext = () => this.page.locator('#passwordNext')

    async loginAccount(urlLogin: string, email: string, pwd: string) {
        await this.page.goto(urlLogin)
        await this.inputEmail().fill(email)
        await this.btnEmailNext().click()
        await this.inputPwd().fill(pwd)
        await Promise.all([
            this.page.waitForNavigation({ url: urlLogin }),
            this.btnPwdNext().click()
        ])
    }
}
