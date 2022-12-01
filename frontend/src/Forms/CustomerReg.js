import React, { useState } from "react";

export default function CustomerReg() {
    const [name, setName] = useState("")

    function handleSubmit() {
        console.log(name);
        console.log("submitted");
    }


    return (<div>

        <label>
            <p>Name</p>
            <input name="name" placeholder="Full Name" onChange={(e) => { name = e.target.value }} />
        </label>
        <label>
            <p>Date of Birth</p>
            <input name="dob" placeholder="DD/MM/YYYY" />
        </label>
        <label>
            <p>Address</p>
            <input name="address" placeholder="Address" />
        </label>
        <label>
            <p>Phone</p>
            <input name="phone" placeholder="Phone" />
        </label>
        <label>
            <p>Occupation</p>
            <input name="occupation" placeholder="Occupation" />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
    </div>)
}    