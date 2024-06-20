import { HTTPRequest } from "./core/HTTPRequest.ts"
import { login } from "../helpers/Login.ts"
import { LoggerController } from "../helpers/LoggerController.ts"
import { HTTPResponse } from "../models/interfaces/HTTPResponse.ts"

export class BaseController {
    protected logger: LoggerController
    httpRequest: HTTPRequest = new HTTPRequest('')

    constructor(instanceName: string) {
        this.logger = new LoggerController(instanceName)
    }

    async loginAndGetData() {
        const { token, userId } = await login()

        process.env.USER_ID = userId ?? ''
        process.env.TOKEN = token

        this.httpRequest.setToken(process.env.TOKEN)
    }

    protected checkResult(response: HTTPResponse, expectSuccess = true): HTTPResponse {
        if ((response.status !== 200 && response.status !== 201 && response.status !== 204) && expectSuccess) {
            this.throwError(
                `${response.requestOptions?.method} ${response.requestOptions?.url}\nCURL:\n\n${response.curl}`,
                response
            )
        }
        return response
    }

    protected throwError(methodName: string, response: HTTPResponse): void {
        const errorMessage = `API CALL ERROR: ${methodName} . Status: ${response.status}. Data: ${JSON.stringify(
            response.data,
            null,
            2
        )}.`

        this.logger.error(errorMessage)
        throw new Error(errorMessage)
    }
}