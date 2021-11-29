import React from 'react'
import "../css/Guide.css";

export default function Guide() {
    return (
        <div className="Guide">
            If you are a test user login using the following email id and password<br/>
            <ul>
                <li><span><u>Email ID </u></span>: testuser@gmail.com<br/></li>
                <li><span><u>Password </u></span>: test</li>
                <li><u>Card Number</u> : 4242 4242 4242 4242</li>
                <li><u>Date</u> : Enter any future date</li>
                <li><u>CVC</u> : Enter any three digit integer</li>
                <li><u>Zipcode</u> : Enter any five digit integer</li>
            </ul>
            <div>Back to the <a href="/login">Login Page</a></div>
        </div>
    )
}
