import { google } from 'googleapis'
import dt from '../fixtures/data.json'

export class Helper {

    async clearSpreadSheetData() {
        const auth = new google.auth.GoogleAuth({
            keyFile: dt.keyFile,
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        })
    
        const client = await auth.getClient()
        const sheets = google.sheets({version: 'v4', auth: client})
    
        await sheets.spreadsheets.values.clear({
            spreadsheetId: dt.idSheet,
            range: 'Sheet1!A2:I10'
        })
        await this.wait(3000)
    }

    async checkMergeStatus(status: string, startRow: number, maxRetries: number): Promise<boolean> {
        if (!maxRetries) return false
        const auth = new google.auth.GoogleAuth({
            keyFile: dt.keyFile,
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        })
    
        const client = await auth.getClient()
        const sheets = google.sheets({version: 'v4', auth: client})
    
        const rows = await sheets.spreadsheets.values.get({
            spreadsheetId: dt.idSheet,
            range: 'Sheet1'
        })
    
        const val = rows.data.values
        val.shift()

        for (let i = startRow; i < val.length; i++) {
            if (!val[i].includes(status)) {
                await this.wait(2000)
                return await this.checkMergeStatus(status, i, maxRetries - 1)
            }
            console.log(val[i])
        }
        return true
    }

    wait = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration))
}