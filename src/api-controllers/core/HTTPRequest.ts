import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import * as https from 'https'
import { HTTPResponse } from '../../models/interfaces/HTTPResponse.ts'
import { LoggerController } from '../../helpers/LoggerController.ts'

export class HTTPRequest {
    private _authToken: string
    private _baseURL: string
    private _logger = new LoggerController('HTTPRequest')

    constructor(authToken: string, baseURL: string = 'https://demoqa.com/') {
        this._authToken = authToken
        this._baseURL = baseURL
    }

    public async post(options: AxiosRequestConfig): Promise<HTTPResponse> {
        return this.sendRequest({ ...options, method: 'POST' })
    }

    public async put(options: AxiosRequestConfig): Promise<HTTPResponse> {
        return this.sendRequest({ ...options, method: 'PUT' })
    }

    public async patch(options: AxiosRequestConfig): Promise<HTTPResponse> {
        return this.sendRequest({ ...options, method: 'PATCH' })
    }

    public async get(options: AxiosRequestConfig): Promise<HTTPResponse> {
        return this.sendRequest({ ...options, method: 'GET' })
    }

    public async delete(options: AxiosRequestConfig): Promise<HTTPResponse> {
        return this.sendRequest({ ...options, method: 'DELETE' })
    }

    public setToken(authToken: string): void {
        this._authToken = authToken
    }

    private async sendRequest(options: AxiosRequestConfig): Promise<HTTPResponse> {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${this._authToken}`
        };

        const axiosConfig: AxiosRequestConfig = {
            ...options,
            baseURL: this._baseURL,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            timeout: 30000
        };

        try {
            const response: AxiosResponse = await axios(axiosConfig)
            return this.onSuccess(response)
        } catch (error) {
            return this.onError(error as AxiosError)
        }
    }

    private onSuccess(response: AxiosResponse): HTTPResponse {
        return {
            data: response.data,
            status: response.status,
            hasError: false,
            requestOptions: response.config
        };
    }

    private onError(error: AxiosError): HTTPResponse {
        const errorMessage = error.response ? `Status: ${error.response.status}, Data: ${error.response.data}` : error.message
        this._logger.error('HTTP Request Error:', errorMessage)
        return {
            data: undefined,
            status: error.response?.status || 500,
            hasError: true,
            errorMessage,
            requestOptions: error.config || {}
        }
    }

}
