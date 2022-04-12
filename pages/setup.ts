import { Browser, chromium } from '@playwright/test'

export class Setup {
    private browser: Browser

    async initBrowser() {
        this.browser = await chromium.launch({ headless: false })
    }

    async initPage() {
        const context = await this.browser.newContext({
            // recordVideo: {
            //     dir: 'videos/',
            //     size: { width: 1080, height: 1920 }
            // }
        })
        return await context.newPage()
    }
}