import { Page } from '@playwright/test'
import data from '../fixtures/data.json'


export class Sheet {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    inputCell = () => this.page.locator('#t-name-box')
    inputValue = () => this.page.locator('#t-formula-bar-input > div')
    iconSaved = async () => await this.page.waitForSelector('div[aria-label="Document status: Saved to Drive."]')
    menuExt = () => this.page.locator('#docs-extensions-menu')
    menuYamm = () => this.page.locator('text=Yet Another Mail Merge: Mail Merge for Gmail')
    menuMailMerge = () => this.page.locator('text=Start Mail Merge')
    iframe = () => this.page.frameLocator('div.script-app-contents > iframe')
    .frameLocator('#sandboxFrame')
    .frameLocator('#userHtmlFrame')
    inputSenderName = () => this.iframe().locator('#senderName_input')
    ddlDraftList = () => this.iframe().locator('#drafts_list')
    ckbReadReceipt = () => this.iframe().locator('#readReceiptCheckbox')
    btnSend = () => this.iframe().locator('#sendButton')
    txtSuccess = () => this.iframe().locator('text=All emails have been sent!')
    btnClose = async () => await this.page.waitForSelector('span.modal-dialog-title-close')

    async inputSpreadSheetData() {
        let row = 2
        for (const inputs of data.receivers) {
            for (let i = 0; i < inputs.length; i++) {
                await this.inputCell().fill(data.cellColumn[i] + row)
                await this.page.keyboard.press('Enter')
                await this.inputValue().fill(inputs[i])
                await this.page.keyboard.press('Enter')
            }
            row++
        }
        await this.iconSaved()
    }

    async sendEmail() {
        await this.menuExt().click()
        await this.page.waitForTimeout(3000)
        await this.menuYamm().click()
        await this.menuMailMerge().click()
        await this.inputSenderName().fill(data.senderName)
        await this.ddlDraftList().selectOption(data.emailDraft)
        if (!this.ckbReadReceipt().isChecked())
            await this.ckbReadReceipt().click()
        await this.btnSend().click()
        await this.txtSuccess().isVisible()
    }
}