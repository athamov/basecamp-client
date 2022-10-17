import axios from 'axios';
import Cookies from 'universal-cookie';
import {AuthResponse} from "../model/response/AuthResponse";

export const API_URL = `https://basecamp-server.herokuapp.com/api`
// export const API_URL = 'http://localhost:7000/api';

function getCookie(cname:string):string {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const cookies = new Cookies(); 
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  console.log(document.cookie);
    console.log(getCookie(document.cookie));
    console.log(cookies.get(`refreshToken`))
    if(config.headers) { config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
                         config.headers.Cookie = document.cookie;
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
            document.cookie = `refreshToken=${response.data.token.refreshToken}; SameSite=None; Secure`;
            localStorage.setItem('token', response.data.token.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api; 