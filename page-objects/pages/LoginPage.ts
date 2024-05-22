import { Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage'

export default class LoginPage extends BasePage {
    public readonly userNameField: Locator
    public readonly passwordField: Locator
    public readonly loginButton: Locator

    constructor(page: Page) {
        super(page, '/login')

        this.userNameField = this.page.locator('#userName')
        this.passwordField = this.page.locator('#password')
        this.loginButton = this.page.locator('#login')
    }

    async enterUsername(username: string) {
        await this.userNameField.fill(username)
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }
}
