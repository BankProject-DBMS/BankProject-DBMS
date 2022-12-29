import axios from 'axios';
import { HOST } from './config';

export async function getWithdrawals() {
  try {
    const response = await axios.post(`${HOST}/withdrawals`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get withdrawals list!');
  }
}

export async function getWithdrawalByID() {
  try {
    const response = await axios.post(`${HOST}/withdrawals/findbyid`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get withdrawal!');
  }
}

export async function addWithdrawal(newWithdrawal) {
  try {
    const response = await axios.post(`${HOST}/withdrawals/add`, newWithdrawal);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to do the withdrawal!');
  }
}

