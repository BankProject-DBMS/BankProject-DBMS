import axios from 'axios';
import { HOST } from './config';

export async function addFD(newFD) {
  try {
    const response = await axios.post(`${HOST}/fixedDeposits/add`, newFD);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to create fixed deposit!');
  }
}

// get all fd accounts of a given customer id
export async function getCustomerFDs() {
  try {
    const response = await axios.get(`${HOST}/fixedDeposits/customer`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get fixed deposits list!');
  }
}

// get details of fds given account id
export async function getFD(accountID) {
  try {
    const response = await axios.get(`${HOST}/fixedDeposits/${accountID}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get Fixed Deposit list!');
  }
}
