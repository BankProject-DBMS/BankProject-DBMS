import axios from 'axios';
import { HOST } from './config';

// get all accounts in the bank
export async function getAccounts() {
  try {
    const response = await axios.get(`${HOST}/accounts`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get accounts list!');
  }
}

// add new cash account
export async function addAccount(newAccount) {
  try {
    const response = await axios.post(`${HOST}/accounts/create`, newAccount);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to add to accounts list!');
  }
}

// get details of account given account id
export async function getAccount(accountID) {
  try {
    const response = await axios.get(`${HOST}/accounts/${accountID}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get accounts list!');
  }
}

// get all cash accounts of a given customer id
export async function getCustomerAccounts() {
  try {
    const response = await axios.get(`${HOST}/accounts/customer`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get accounts list!');
  }
}
