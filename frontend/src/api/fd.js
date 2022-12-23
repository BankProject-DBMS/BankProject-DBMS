import axios from 'axios';
import { HOST } from './config';



export async function addFD(newCustomer) {
    try {
        const response = await axios.post(`${HOST}/fixedDeposits/add`, newCustomer);
        console.log(response);
    } catch (err) {
        console.log(err);
        return await Promise.reject('Failed to create fixed deposit!');
    }
}
