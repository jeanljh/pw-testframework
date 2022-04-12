import { Page } from '@playwright/test'

export class Email {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    latestInbox = () => this.page.locator('tr.zA.zE').first()
    emailContent = async(val: any) => await this.page.waitForSelector(`text="${val}"`)

    clickLatestInbox = async () => { 
        await this.latestInbox().click() 
        await this.page.waitForLoadState('domcontentloaded')
    }

    clickLatestInbox2 = async (data: string[]) => { 
        await this.latestInbox().click() 
        await this.page.waitForLoadState('domcontentloaded')
        for (const d of data) {
            await this.emailContent(d)
        }
    }
}