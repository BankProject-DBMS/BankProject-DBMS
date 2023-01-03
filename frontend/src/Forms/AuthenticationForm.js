import React from "react";

export default function AuthenticationForm() {
    return (
        <form>
            <label for="fname">Username:</label><br />
            <input type="text" placeholder="Username" /><br />
            <label for="lname">Password:</label><br />
            <input type="password" placeholder="Password" />
        </form>)
}