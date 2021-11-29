import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "../css/NavBar.css";
import SearchButt from "../assets/search.svg";
import Wallet from "../assets/wallet.svg";
import APIcallsfunc from "./API";

export default function NavBar(){
    const [loadingState, setLoadingState] = useState<Boolean>(false);
    const APIobject = APIcallsfunc();
    useEffect(()=>{
        fetch(APIobject.URL, {
            headers:APIobject.headers
        })
        .then(res => res.json())
        .then(data => {
            if (data.logged === true){
                setLoadingState(true);
            }
        }).catch(err => console.log(err));
    }, [APIobject]);
    return (
        <div className="NavBar">
            <img src="" alt="Logo"/>
            <div className="searchbar">
                <input type="text" placeholder="Search"/>
                <button><img src={SearchButt} alt="O"/></button>
            </div>
            <div className="user-wallet">
                <Link className="wallet" to={loadingState?"wallet":"login"}>
                    <img src={Wallet} alt="wallet" />
                    {loadingState && <span>Wallet</span>}
                    {!loadingState && <span>Login</span>}
                </Link>
            </div>
        </div>
    )
}