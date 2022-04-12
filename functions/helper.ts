import { google } from 'googleapis'
import dt from '../fixtures/data.json'

export class Helper {

    async checkMergeStatus2(status: string) {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'key.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        })
    
        const client = await auth.getClient()
        const sheets = google.sheets({version: 'v4', auth: client})
    
        // const data = await sheets.spreadsheets.get({
        //     auth: client,
        //     spreadsheetId: '12oscn8PlPjVsO9chJZsrqo3u6OA5mV1Vpu6VWkDgeZs'
        // })
    
    
        const rows = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: dt.idSheet,
            range: 'Sheet1'
        })
    
        const val = rows.data.values
        val.shift()

        val.forEach((v: any) => {
            console.log(v.join('|'))
            v[v.length - 1] === 'EMAIL_SENT'
        })
        return val.every((v: any) => v[v.length - 1] === status)

        // const ok = true
        // for (let i = 1; i < val.length; i++) {
        //     console.log('-----------------------')
        //     console.log(val[i])
        //     // console.log(val.every((v: any) => v[v.length - 1] === 'EMAIL_SENT'))
        //     // if val[i].includes('EMAIL_SENT'))
        //     // if (val[i].includes('EMAIL_SENT'))
        // }
    }

    async checkMergeStatus(status: string, startRow: number, maxRetries: number): Promise<boolean> {
        if (!maxRetries) return false
        const auth = new google.auth.GoogleAuth({
            keyFile: 'key.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        })
    
        const client = await auth.getClient()
        const sheets = google.sheets({version: 'v4', auth: client})
    
        const rows = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: dt.idSheet,
            range: 'Sheet1'
        })
    
        const val = rows.data.values
        val.shift()

        for (let i = startRow; i < val.length; i++) {
            console.log(val[i])
            if (!val[i].includes(status)) {
                console.log('heree')
                await this.wait(2000)
                return await this.checkMergeStatus(status, i, maxRetries - 1)
            }
        }
        return true
    }

    wait = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration))
}