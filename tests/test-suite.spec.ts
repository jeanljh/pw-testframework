import { test, expect, Page } from '@playwright/test'
import ckSender from '../cookies-sender.json'
import ckReceiver from '../cookies-receiver.json'
import data from '../fixtures/data.json'
import { Setup } from '../pages/setup'
import { Sheet } from '../pages/sheet'
import { Email } from '../pages/email'
import { Helper } from '../functions/helper'

test.describe('Test Suite', () => {
    let setup: Setup
    let page: Page
    let sheet: Sheet
    let email: Email
    let helper: Helper

    test.beforeAll(async () => {
        setup = new Setup()
        // initialize chromium browser
        await setup.initBrowser()
        // initialize page
        page = await setup.initPage()
        sheet = new Sheet(page)
        helper = new Helper()
    })

    test('e2e test mail merge', async () => {
        // login to user account and go to file url
        // await login.loginAccount(data.urlFile, data.emailSender.email, data.emailSender.pwd)
        // set non-expired cookie
        await setup.setCookieExpireDate(ckSender[0])
        await page.goto(data.urlFile)
        // clear spreadsheet data
        await helper.clearSpreadSheetData()
        // enter spreadsheet data
        await sheet.inputSpreadSheetData()
        // send emails via yamm mail merge
        await sheet.sendEmail()
        // validate merge status is 'EMAIL_SENT' for all recipients
        let result = await helper.checkMergeStatus('EMAIL_SENT', 0, 5)
        expect(result).toBeTruthy()

        // // login to each recipient's email and open latest email in inbox
        // for (const user of data.emailReceivers) {
        //     await setup.initBrowser()
        //     page = await setup.initPage()
        //     login = new Login(page)
        //     email = new Email(page)
        //     await login.loginAccount(data.urlEmail, user.email, user.pwd)
        //     await email.clickLatestInbox()
        // }

        // open latest inbox of each receivers
        for (const cookie of ckReceiver) {
            await setup.initBrowser()
            page = await setup.initPage()
            await setup.setCookieExpireDate(cookie)
            email = new Email(page)
            await page.goto(data.urlEmail)
            await email.clickLatestInbox()
        }

        // validate merge status is 'EMAIL_OPENED' for all recipients
        result = await helper.checkMergeStatus('EMAIL_OPENED', 0, 5)
        expect(result).toBeTruthy()
    })
})
