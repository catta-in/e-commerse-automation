import { test, expect } from '@playwright/test'
import { login } from '../../helpers/Login'

test.describe('', () => {
    test.beforeAll(async () => {
        const { token, userId } = await login()
        process.env.TOKEN = token
        process.env.USER_ID = userId
    })

    test('Expect token and userId to be defined', async () => {
        expect(process.env.TOKEN).toBeDefined()
        expect(process.env.USER_ID).toBeDefined()
    })
})

