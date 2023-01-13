import axios from 'axios';
import { HOST } from './config';

export async function getDeposites() {
  try {
    const response = await axios.post(`${HOST}/deposites`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get deposites list!');
  }
}

export async function getDepositByID() {
  try {
    const response = await axios.post(`${HOST}/deposites/findbyid`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get deposit!');
  }
}

export async function addDeposit(newDeposit) {
  try {
    const response = await axios.post(`${HOST}/deposites/add`, newDeposit);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to create the deposit!');
  }
}
