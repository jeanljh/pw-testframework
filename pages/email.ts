import { Page } from '@playwright/test'

export class Email {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    latestInbox = () => this.page.locator('tr.zA.zE').first()

    clickLatestInbox = async () => { 
        await this.latestInbox().click() 
        await this.page.waitForLoadState('domcontentloaded')
    }
}