import { getLogger } from 'log4js'
import { Logger as log4js } from 'log4js'
/* eslint-disable @typescript-eslint/no-explicit-any*/

const suiteLogs: string[][] = []
let specLogs: string[] = []

export class LoggerController {
    private log4js: log4js
    private category: string

    constructor(category: string) {
        this.log4js = getLogger(category)
        this.log4js.level = 'trace'
        this.category = category
    }

    public trace(message: string, ...args: any[]): void {
        this.log4js.trace(`${message}`, ...args)
    }

    public info(message: string, ...args: any[]): void {
        this.log4js.info(`${message}`, ...args)
        specLogs.push(message)
    }

    public error(message: string, ...args: any[]): void {
        this.log4js.error(`${message}`, ...args)
        specLogs.push(message)
    }

    public warn(message: string, ...args: any[]): void {
        this.log4js.warn(`${message}`, ...args)
        specLogs.push(message)
    }

    public getSpecLogs(): string[] {
        const logsToReturn: string[] = specLogs
        suiteLogs.push(logsToReturn)
        specLogs = []

        return logsToReturn
    }

    public getLogs(): string[][] {
        const logsToReturn: string[][] = JSON.parse(JSON.stringify(suiteLogs))
        for (let i = 0; i < logsToReturn.length; i++) {
            const specLogs = logsToReturn[i]
            let lastLayoutLogIndex = 0
            for (let j = 0; j < specLogs.length; j++) {
                const log = specLogs[j]
                if (log.length) {
                    lastLayoutLogIndex = j
                }
            }
            logsToReturn[i].splice(lastLayoutLogIndex + 1)
        }

        return logsToReturn
    }
}
