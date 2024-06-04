import { test, expect } from '@playwright/test'
import { userDetails } from '../../data/userDetails.ts'
import LoginPage from '../../page-objects/pages/LoginPage.ts'
import ProfilePage from '../../page-objects/pages/ProfilePage.ts'

const user = {
    username: userDetails.username,
    password: userDetails.password
}

test('Log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const profilePage = new ProfilePage(page)

    await loginPage.navigate()
    await loginPage.enterUsername(user.username)
    await loginPage.enterPassword(user.password)
    await loginPage.clickLoginButton()

    await expect(page).toHaveURL('/profile')
    await expect(profilePage.logoutButton).toBeVisible()
});
