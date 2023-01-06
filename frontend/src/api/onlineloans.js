import axios from 'axios';
import { HOST } from './config';

// get all fd accounts of a given customer id
export async function getCustomerOnlineLoans(customerID) {
  try {
    const response = await axios.get(
      `${HOST}/onlineLoans/customer/${customerID}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to get online deposits list!');
  }
}
