import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import APIcalls from "./API";
import "../css/LoginPage.css";

export default function LoginPage() {
    interface LoginError{
        emailid: boolean,
        password: boolean,
        logged: boolean
    }

    const [loadingState, setLoadingState] = useState<Boolean>(false);
    const [jwtToken, setjwtToken] = useState<string>("");
    const [loginError, setLoginError] = useState<LoginError>();
    const [errorDisplay, setErrorDisplay] = useState<Boolean>(false);
    const history = useHistory();

    /// storing the data to localStorage

    useEffect(() => {
        if(jwtToken.split(" ")[0]==="Bearer"){
            localStorage.removeItem("token");
            localStorage.setItem("token", jwtToken);
        }
        return ()=>{
        }
    }, [jwtToken]);
    /// handling error function
    useEffect(()=>{
        console.log(loginError);
        async function errorDisplayfunc(){
            if (loginError?.emailid === false){
                await setErrorDisplay(true);
                (document.getElementById("error-type") as HTMLElement).textContent = "Enter a valid Email Address";
            }
            if(loginError?.password === false){
                await setErrorDisplay(true);
                (document.getElementById("error-type") as HTMLElement).textContent = "Entered password dosen't match";
            }
            if(loginError?.logged === false){
                await setErrorDisplay(true);
                (document.getElementById("error-type") as HTMLElement).textContent = "Entered a wrong username or password";
            }
        }
        errorDisplayfunc();
}, [loginError]);

    /// handling user login function
    const loginUser= async ()=>{
        setLoadingState(true);
        const emailid = (document.getElementById("email-id") as HTMLInputElement);
        const password = (document.getElementById("password") as HTMLInputElement).value;
        if (emailid.validity.valid && password && emailid.value){
            const data = {
                emailid : emailid.value,
                password
            }
            await fetch(`${APIcalls().URL}login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(async (data) => {
                if(data.access_token){
                    let token: string = `Bearer ${data.access_token}`;
                    await setjwtToken(token);
                    history.push("/");
                    return;
                }
                setLoginError(data);
            })
            .catch(error => console.log(error));
        }else{
            await setErrorDisplay(true);
            (document.getElementById("error-type") as HTMLElement).textContent = "Entered a wrong username or password";
        }
        setLoadingState(false);
    }
    return (
        <div className="LoginPage">
            <div>
            <div className="login-credentials">
                <div><u>LOGIN PAGE :</u></div>
                <div>
                    <label htmlFor="email-id">Email ID: </label>
                    <div className="underline-box">
                        <input name="email-id" id="email-id" type="email" placeholder="Enter your Email Address"/>
                        <div className="underline"></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <div className="underline-box">
                        <input name="password" id="password" type="password" placeholder="Enter your password"/>
                        <div className="underline"></div>
                    </div>
                </div>
                {!loadingState && <button className="login-button" onClick={loginUser}>LOGIN</button>}
                {loadingState && <button className="loading-button" disabled>Please Wait...</button>}
                {errorDisplay && <div id="error-type" style={{color: "red"}}></div>}
                <div>Don't have an account?<Link to="/signup">Create an account</Link></div>
            </div>
            Make sure to read the <Link to="/guide">Guide</Link> for login details and more
            </div>
        </div>
    )
}