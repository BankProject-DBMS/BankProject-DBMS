import axios from 'axios';
import { HOST } from './config';

export async function loginCustomer(loginDetails) {
  try {
    const response = await axios.post(`${HOST}/login/customer`, loginDetails);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed log in');
  }
}
