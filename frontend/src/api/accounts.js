import axios from 'axios';
import { HOST } from './config';

export async function getAccounts() {
  try {
    const response = await axios.get(`${HOST}/accounts`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get accounts list!');
  }
}

export async function addAccount(newAccount) {
  try {
    const response = await axios.post(`${HOST}/accounts/add`, newAccount);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to add to accounts list!');
  }
}

export async function getAccount(accountID) {
  try {
    const response = await axios.get(`${HOST}/accounts/${accountID}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get accounts list!');
  }
}
