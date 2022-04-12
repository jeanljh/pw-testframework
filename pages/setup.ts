import { Browser, chromium } from '@playwright/test'

export class Setup {
    private browser: Browser
    async init() {
        const browser = await chromium.launch({
            headless: false,
            args: [
                // "--disable-dev-shm-usage", 
            ],
        });
        const context = await browser.newContext({
            // recordVideo: {
            //     dir: 'videos/',
            //     size: { width: 1080, height: 1920 }
            // }
        });
        return await context.newPage()
        // const navigationPromise = page.waitForNavigation({
        //     waitUntil: "domcontentloaded",
        // });
    }

    async initBrowser() {
        this.browser = await chromium.launch({
            headless: false,
        })
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