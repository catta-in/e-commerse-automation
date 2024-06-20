import { Page } from '@playwright/test'

export class BasePage {
    protected page: Page
    protected _url: string

    constructor(page: Page, url: string) {
        this.page = page
        this._url = url
    }

    async navigate() {
        await this.page.goto(this._url)
    }
}