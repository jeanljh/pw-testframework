import { test, expect } from '@playwright/test'
import data from '../fixtures/data.json'
import { Login } from '../pages/login'
import { Setup } from '../pages/setup'
import { Sheet } from '../pages/sheet'
import { Email } from '../pages/email'
import { Helper } from '../functions/helper'

test.describe('Test Suite', () => {
    let setup: Setup
    let login: Login
    let sheet: Sheet
    let email: Email
    let helper: Helper

    test.beforeAll(async () => {
        setup = new Setup()
        // page = await setup.init()
        // initialize chromium browser
        await setup.initBrowser()
        // initialize page
        const page = await setup.initPage()
        login = new Login(page)
        sheet = new Sheet(page)
        helper = new Helper()
    })

    test('e2e test mail merge', async () => {
        // login to user account and go to file url
        await login.loginAccount(data.urlFile, data.emailSender.email, data.emailSender.pwd)
        // enter spreadsheet data
        await sheet.inputSpreadSheetData()
        // send emails via yamm mail merge
        // await sheet.sendEmail()
        // validate merge status is 'EMAIL_SENT' for all recipients
        // let result = await helper.checkMergeStatus('EMAIL_SENT', 0, 5)
        // expect(result).toBeTruthy()

        // // login to each recipient's email and open latest email in inbox
        // for (const user of data.emailReceivers) {
        //     await setup.initBrowser()
        //     const pageNew = await setup.initPage()
        //     login = new Login(pageNew)
        //     email = new Email(pageNew)
        //     await login.loginAccount(data.urlEmail, user.email, user.pwd)
        //     await email.clickLatestInbox()
        // }

    //     // validate merge status is 'EMAIL_OPENED' for all recipients
    //     result = await helper.checkMergeStatus('EMAIL_OPENED', 0, 5)
    //     expect(result).toBeTruthy()
    })
})
