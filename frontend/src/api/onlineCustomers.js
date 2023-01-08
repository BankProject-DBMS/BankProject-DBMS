
import axios from 'axios';
import { HOST } from './config';

export async function addOnlineCustomer(newOnlineCustomer) {
    try {
      const response = await axios.post(`${HOST}/onlineCustomer/add`, newOnlineCustomer);
      console.log(response);
    } catch (err) {
      console.log(err);
      return await Promise.reject('Failed to add to Online Customer list!');
    }
  }