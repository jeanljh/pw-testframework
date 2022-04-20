import { Browser, BrowserContext, chromium } from '@playwright/test'
import fs from 'fs'

export class Setup {
    private browser: Browser
    private context: BrowserContext

    async initBrowser() {
        this.browser = await chromium.launch({ headless: false })
    }

    async initPage() {
        this.context = await this.browser.newContext({
            // recordVideo: {
            //     dir: 'videos/',
            //     size: { width: 1080, height: 1920 }
            // }
        })
        return await this.context.newPage()
    }

    async getContext() {
        return this.context
    }

    async setCookieExpireDate(cookie: any) {
        for (const c of cookie) {
            // set expires property to now plus extra 3 minutes (180 seconds)
            c.expires = (Date.now() / 1000) + 180
        }
        this.context.addCookies(cookie)
    }

    async getCookieAndStore(path: string) {
        fs.writeFileSync(path, JSON.stringify(await this.context.cookies()))
    }
}