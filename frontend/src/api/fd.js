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
