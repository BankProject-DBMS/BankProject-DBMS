import React, { useState } from "react";
import { addCustomer } from "../api/customers";

export default function CustomerReg() {
    const [name, setName] = useState('')
    const [dateofbirth, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [occupation, setOccupation] = useState('')


    function handleSubmit(event) {
        //console.log({ name, date, address, phone, occupation });
        console.log("submitted");

        const customer = { name, dateofbirth, address, phone, occupation };
        addCustomer({ customer });
        event.preventDefault();

    }

    // TODO Consider using https://formik.org
    return (
        <div className="form">
            <label>
                <p>Name</p>
                <input name="name" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <p>Date of Birth</p>
                <input type='date' value={dateofbirth} name="dob" onChange={(e) => setDate(e.target.value)} />
            </label>
            <label>
                <p>Address</p>
                <input name="address" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                <p>Phone</p>
                <input value={phone} name="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
                <p>Occupation</p>
                <input value={occupation} name="occupation" placeholder="Occupation" onChange={(e) => setOccupation(e.target.value)} />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>)
}    