import { test, expect } from '@playwright/test'
import { login } from '../../helpers/Login';
declare global {
    namespace NodeJS {
        interface Global {
            tokenStorage: string
            userIdStorage: string
        }
    }
}
test('Log in and get token & userId', async () => {
    const { token, userId } = await login()
    global.tokenStorage = token
    global.userIdStorage = userId
    console.log(global.tokenStorage)
    console.log(global.userIdStorage)
})

