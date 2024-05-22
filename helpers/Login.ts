import axios, { AxiosResponse } from 'axios'

export async function login(): Promise<string | null> {
    const payload = {
        password: "Chaponga11!",
        userName: "mxxx"
    };

    try {
        const response: AxiosResponse = await axios.post('https://demoqa.com/Account/v1/Login', payload,
            {
                headers: {
                    'Content-Type': 'application/json',

                }
            });

        if (response.status === 200 && response.data && response.data.token) {
            return response.data.token;
        } else {
            console.error('Login failed:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}
