import axios from 'axios';
import { HOST } from './config';

export async function getAccounts() {
  try {
    const response = await axios.post(`${HOST}/accounts`);
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

export async function getUserAccounts() {
  // Get accounts of the User in to the customer portal
  console.log('Got Accounts');
  return {
    Cash: {
      Account1: { number: 1, amount: 100000 },
      Account2: { number: 2, amount: 20000 },
    },
    FD: {
      FdAccount1: { number: 11, amount: 100000 },
      FdAccount2: { number: 12, amount: 20000 },
    },
    Loan: {
      LAccount1: { number: 21, amount: 100000 },
      LAccount2: { number: 22, amount: 20000 },
    },
  };
}
