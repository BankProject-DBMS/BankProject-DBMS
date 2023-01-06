import axios from 'axios';
import { HOST } from './config';

// get all loans in the bank
export async function getLoans() {
  try {
    const response = await axios.get(`${HOST}/loans`);
    return response.data;
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to get loan list!');
  }
}

// add new loan to the bank
export async function addLoan(newLoan) {
  try {
    const response = await axios.post(`${HOST}/loan/add`, newLoan);
    console.log(response);
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to add to loan list!');
  }
}
