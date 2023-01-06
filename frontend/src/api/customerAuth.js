import axios from 'axios';
import { HOST } from './config';

export const customerAxios = axios.create({ baseURL: HOST });

customerAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Came into interceptor');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function customerLogin(credentials) {
  try {
    const response = await axios.post(`${HOST}/login/customer`, credentials);
    if (response.data.auth === 'success') {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      return await Promise.reject(response.data.message);
    }
  } catch (error) {
    return await Promise.reject('Login Error: ', error);
  }
}

export async function customerLogout() {
  try {
    localStorage.removeItem('token');
    return await Promise.resolve('Logout Successful');
  } catch (error) {
    return await Promise.reject('Logout Error: ', error);
  }
}
