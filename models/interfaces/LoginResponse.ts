export default interface LoginResponse {
    userId: string
    username: string,
    password: string
    token: string
    expires: string
    created_date: string
    isActive: boolean
}