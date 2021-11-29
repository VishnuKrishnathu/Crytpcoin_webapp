import React, {useState, useEffect} from 'react'
import "../css/WalletHistory.css";
import Expand from "../assets/expand.svg";
import APIcallsfunc from "./API";

export default function WalletHistory() {
    const [coinHistory, setCoinHistory] = useState([]);
    const [user, setUser] = useState<String | string>("");
    const showDetails = (event :any) =>{
        const display = (event.nativeEvent.path[3] as HTMLDivElement);
        const coindetails = display.querySelector(".coin-wallet-details");
        const expand_button = display.querySelector(".coin-wallet-display>button>img") as HTMLImageElement;
        if(coindetails?.getAttribute("id")){
            expand_button.style.transform = "rotate(0deg)"
            coindetails?.removeAttribute("id");
            return;
        };
        expand_button.style.transform = "rotate(180deg)"
        coindetails?.setAttribute("id", "expanded");
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token?.split(" ")[0]==="Bearer"){
            fetch(`${APIcallsfunc().URL}user-info`, {
                headers: APIcallsfunc().headers
            }).then(res => res.json()).then(data => {
                if (data.firstname){
                    setUser(`${data.firstname} ${data.lastname}`);
                }
            })
            .catch(err => console.log(err));
        }
        fetch(`${APIcallsfunc().URL}paymenthistory`, {
            headers: APIcallsfunc().headers
        }).then(res => res.json())
        .then(data => setCoinHistory(data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="WalletHistory">
            <div className="greet">
                Hey, <br/>
                {user}
            </div>
            <div className="purchase-history">
                Purchase histroy :
            </div>
            <div className="History-display">
                {
                    coinHistory.map((data : any) => {
                        return (
                            <div key={data._id}>
                                <div className="coin-wallet-display">
                                    <div className="crypto-coin-name">{data.coin}</div>
                                    <button onClick={showDetails}>
                                        <img src={Expand} alt="expand"/>
                                    </button>
                                </div>
                                <div className="coin-wallet-details">
                                    <div>Coins purchased : {data.amountBTC}</div>
                                    <div>Payment amount : ${data.amountUSD}</div>
                                    <div>Payment ID : {data.paymentID}</div>
                                    <div>Price(USD) :</div>
                                    <div>Date of purchase : {data.date_of_purchase} ({data.time_of_purchase})</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
