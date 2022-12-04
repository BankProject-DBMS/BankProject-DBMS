import axios from 'axios';
import { HOST } from './config';

export function getCustomers() {
  /*
  try {
    const res = await axios.post(`${HOST}/customers`);
    return res.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject(err);
  }*/
  return axios
    .get(`${HOST}/branches`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject('Failed to get customers list!'));
}
