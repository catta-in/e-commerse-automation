import { test } from "@playwright/test"
import { login } from "../../helpers/Login.ts"

test('Get token', async () => {
    const token = await login()
    console.log(token)
})