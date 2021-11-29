import React, {useState} from 'react'
import "../css/SignupPage.css";
import APIcallsfunc from "./API";

export default function SignupPage() {
    const api = APIcallsfunc();
    const [loadingState, setLoadingState] = useState<Boolean>(false);
    const registerUser = async ()=>{
        setLoadingState(true);
        const inputValidation = (document.getElementById("email-address") as HTMLInputElement);
        const password1 = (document.getElementById("password1") as HTMLInputElement)?.value;
        const password2 = (document.getElementById("password2") as HTMLInputElement)?.value;
        const firstname = (document.getElementById("first-name") as HTMLInputElement);
        const lastname = (document.getElementById("last-name") as HTMLInputElement);
        if(inputValidation.validity.valid && password1 === password2 && firstname?.validity.valid && lastname?.validity.valid){
            const data = {
                firstname: firstname.value,
                lastname: lastname.value,
                emailid: inputValidation.value,
                password: password2
            };
           await fetch(`${api.URL}signup`, {
               method: 'POST',
               headers:{
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(data),
           }).then(response => response.json())
           .then(data => console.log(data)).catch(error => console.log(error));
        };
        setLoadingState(false);
    }
    return (
        <div className="SignupPage">
            <div className="signup-credentials">
                <div><u>SIGN UP :</u></div>
                <div>
                    <label htmlFor="first-name" >First Name :</label>
                    <div className="underline-box--signup">
                        <input name="first-name" id="first-name" type="text"/>
                        <div className="underline--signup"></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="last-name" >Last Name :</label>
                    <div className="underline-box--signup">
                        <input name="last-name" id="last-name" type="text"/>
                        <div className="underline--signup"></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="email-address" >Email ID</label>
                    <div className="underline-box--signup">
                        <input name="email-address" id="email-address" type="email"/>
                        <div className="underline--signup"></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="password1" >Password :</label>
                    <div className="underline-box--signup">
                        <input name="password1" id="password1" type="password"/>
                        <div className="underline--signup"></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="password2" >Confirm Password :</label>
                    <div className="underline-box--signup">
                        <input name="password2" id="password2" type="password"/>
                        <div className="underline--signup"></div>
                    </div>
                </div>
                {!loadingState && <button id="create-account" onClick={registerUser}>Create Account</button>}
                {loadingState && <button id="create-account--loading" disabled>Creating account...</button>}
            </div>
        </div>
    )
}
