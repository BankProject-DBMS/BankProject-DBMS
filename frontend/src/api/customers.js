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
    .post(`${HOST}/customers`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject('Failed to get customers list!')
    });
}
