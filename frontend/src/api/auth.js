import axios from 'axios';
import { HOST } from './config';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(credentials) {
  console.log(credentials);
  try {
    if (credentials.loginDetails.role === 'customer') {
      const response = await axios.post(`${HOST}/login/customer`, credentials);
      if (response.data.auth === 'success') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', Date.now() + 900000);
        localStorage.setItem('role', response.data.role);
        return response.data;
      } else {
        return await Promise.reject(response.data.message);
      }
    } else if (credentials.loginDetails.role === 'employee') {
      const response = await axios.post(`${HOST}/login/employee`, credentials);
      if (response.data.auth === 'success') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiration', Date.now() + 7200000);
        localStorage.setItem('role', response.data.role);
        return response.data;
      } else {
        return await Promise.reject(response.data.message);
      }
    }
  } catch (error) {
    return await Promise.reject(error.message);
  }
}

export async function customerLogout() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('role');
    return await Promise.resolve('Logout Successful');
  } catch (error) {
    return await Promise.reject('Logout Error: ', error);
  }
}

export function customerLoggedIn() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (role !== 'customer') {
    console.log('Role is not customer');
    return false;
  }

  if (!token) {
    console.log('No token');
    return false;
  }

  if (Date.now() > tokenExpiration) {
    console.log('Token expired');
    return false;
  }

  return true;
}

export async function employeeLoggedIn() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (role !== 'employee') {
    console.log('Role is not employee');
    return false;
  }

  if (!token) {
    console.log('No token');
    return false;
  }

  if (Date.now() > tokenExpiration) {
    console.log('Token expired');
    return false;
  }

  return true;
}

export async function managerLoggedIn() {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  if (role !== 'manager') {
    console.log('Role is not manager');
    return false;
  }

  if (!token) {
    console.log('No token');
    return false;
  }

  if (Date.now() > tokenExpiration) {
    console.log('Token expired');
    return false;
  }

  return true;
}
