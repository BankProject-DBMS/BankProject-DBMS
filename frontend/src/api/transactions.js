import axios from 'axios';
import { HOST } from './config';

export async function getTransactions() {
  try {
    const response = await axios.get(`${HOST}/transactions`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get accounts list!');
  }
}

export async function getCreditTransactions(accountID) {
  try {
    const response = await axios.get(
      `${HOST}/transactions/credit/${accountID}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to get credit transactions list!');
  }
}

export async function getDebitTransactions(accountID) {
  try {
    const response = await axios.get(`${HOST}/transactions/debit/${accountID}`);
    return response.data;
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to get debit transactions list!');
  }
}

export async function createTransaction(transaction) {
  try {
    const response = await axios.post(
      `${HOST}/transactions/create`,
      transaction
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to create transaction!');
  }
}
