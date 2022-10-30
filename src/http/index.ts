import axios from 'axios';
// import Cookies from 'universal-cookie
import {AuthResponse} from "../model/response/AuthResponse";

// export const API_URL = `https://basecamp-server.herokuapp.com/api`
export const API_URL = 'http://localhost:7000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if(config.headers) { config.headers.Authorization = `${localStorage.getItem('token')}`;
                         config.withCredentials = true;
                        }
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error:any) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            document.cookie = `refreshToken=${response.data.token.refreshToken};expires=1000000000; SameSite=None; Secure`;
            localStorage.setItem('token', response.data.token.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api; 