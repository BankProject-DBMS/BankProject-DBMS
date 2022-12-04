import axios from 'axios';
import { HOST } from './config';

export async function getCustomers() {
  try {
    const res = await axios.post(`${HOST}/customers`);
    return res.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject(err);
  }
}
