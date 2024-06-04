import axios, { AxiosResponse } from 'axios'
import { userDetails } from '../data/userDetails'
import LoginResponse from '../models/interfaces/LoginResponse';


export async function login(): Promise<LoginResponse> {
    const payload = {
        password: userDetails.password,
        userName: userDetails.username
    };

    try {
        const response: AxiosResponse = await axios.post('https://demoqa.com/Account/v1/Login', payload,
            {
                headers: {
                    'Content-Type': 'application/json',

                }
            });

        if (response.status === 200 && response.data && response.data.token) {
            return response.data;
        } else {
            console.error('Login failed:', response.data);
            return {} as LoginResponse;
        }
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        return {} as LoginResponse;
    }
}
