import { AxiosRequestConfig } from 'axios'

export interface HTTPResponse<T = any> {
	data: T
	status: number
	hasError: boolean
	errorMessage?: any
	curl?: string
	requestOptions: AxiosRequestConfig
}