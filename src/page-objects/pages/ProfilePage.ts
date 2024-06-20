import { Locator, Page } from '@playwright/test'
import { BasePage } from '../base/BasePage'

export default class ProfilePage extends BasePage {
    public readonly logoutButton: Locator

    constructor(page: Page) {
        super(page, '/profile')

        this.logoutButton = this.page.locator('button', { hasText: 'Log out' })
    }
}