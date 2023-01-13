import axios from 'axios';
import { HOST } from './config';

export async function getEmployees() {
  try {
    const response = await axios.get(`${HOST}/employees`);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get employees list!');
  }
}

export async function addEmployee(newEmployee) {
  try {
    const response = await axios.post(`${HOST}/employees/create`, newEmployee);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to add to employees list!');
  }
}
