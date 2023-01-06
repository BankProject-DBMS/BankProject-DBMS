import axios from 'axios';
import { HOST } from './config';

// get all physical loan accounts of a given customer id
export async function getCustomerPhysicalLoans(customerID) {
  try {
    const response = await axios.get(
      `${HOST}/physicalLoans/customer/${customerID}`
    );
    return response.data;
  } catch (err) {
    // console.log(err);
    return await Promise.reject('Failed to get physical loans list!');
  }
}
