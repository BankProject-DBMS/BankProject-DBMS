import axios from 'axios';
import { HOST } from './config';
import { getDate } from '../utils/dateFormat';

export async function getCustomers() {
  try {
    const response = await axios.post(`${HOST}/customers`);
    // change full date string to ISO format, yyyy-MM-DD
    for (let key in response.data) {
      const newDate = getDate(response.data[key].dateofbirth);
      response.data[key].dateofbirth = newDate;
    }
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

export async function updateCustomer(updatedCustomer) {
  try {
    console.log(updatedCustomer);
    const response = await axios.put(
      `${HOST}/customers/${updatedCustomer.customerId}`,
      updatedCustomer
    );
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to update customer!');
  }
}

export async function getCustomer(id) {
  try {
    const response = await axios.get(`${HOST}/customers/${id}`);
    // console.log(response.data);
    response.data.dateofbirth = getDate(response.data.dateofbirth);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to add to customers list!');
  }
}
