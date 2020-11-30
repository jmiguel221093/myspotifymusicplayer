import axios from 'axios';
import { User } from '../libs';
import { refreshToken } from './requests';

const clientId = process.env.REACT_APP_SPOTIFY_AUTH_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_AUTH_CLIENT_SECRET;

const AUTH_BASE_URL = "https://accounts.spotify.com";
const API_BASE_URL = "https://api.spotify.com";

export const authApi = axios.create({
    baseURL: AUTH_BASE_URL
});

authApi.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
authApi.defaults.headers.common['Authorization'] = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

export const api = axios.create({
    baseURL: API_BASE_URL+"/v1"
});
api.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
if(User.getAuth())
    api.defaults.headers.common['Authorization'] = `Bearer ${User.getAuth().access_token}`;

api.interceptors.response.use(response => response, error => {
    const status = error.response?.status;
    console.log(error.response);
    if(status === 401){
        return refreshToken().then(_ => {
            api.defaults.headers.common['Authorization'] = `Bearer ${User.getAuth().access_token}`;
            error.config.headers['Authorization'] = `Bearer ${User.getAuth().access_token}`;
            return api.request(error.config)
        })
    }
    return Promise.reject(error);
})