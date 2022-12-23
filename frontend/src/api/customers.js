import axios from 'axios';
import { HOST } from './config';

export async function getCustomers() {
  try {
    const response = await axios.post(`${HOST}/customers`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get customers list!');
  }
}

export async function addCustomer(newCustomer) {
  try {
    const response = await axios.post(`${HOST}/customers/add`, newCustomer);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to add to customers list!');
  }
}
