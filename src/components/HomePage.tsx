import Card from "./Card";
import "../css/HomePage.css";
import GIF from "../assets/crypto_vid.gif";
import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

export default function HomePage(){
    const [loadingState , setLoadingState] = useState(true);
    const [cryptoData, setCryptoData] = useState([]);
    const [tryAgain, setTryAgain] = useState<Boolean>(false);

    useEffect(()=>{
        let status_coin :string = 'active';
        let per_page :number = 90;
        let page_number :number = 1;
        const API_KEY :string = "66922aeaa211b6765271e517b079a07c";
        const url :string = `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&status=${status_coin}&per-page=${per_page}&page=${page_number}`;
        fetch(url).then(res => res.json()).then(data => {
            setCryptoData(data);
            setLoadingState(false);
        }).catch(error => setTryAgain(true));
    },[])

    return (
        <div id="HomePage">
            <div>Do follow <a href="https://nomics.com">Crypto Market Cap & Pricing Data Provided By Nomics</a></div>
            <div className="gallery">
                <img src={GIF} alt="GIF" height="auto" width="100%"/>
            </div>
                {!loadingState &&
                    <div id="crypto_cards">
                    {
                        cryptoData.map((data :any)=>{
                            return (
                                <Link key={data.id} to={data.id}>
                                <Card currency_name={data.currency}
                                    currency_symbol={data.symbol}
                                    price={data.price}
                                    logo={data.logo_url}
                                />
                                </Link>
                            );
                        })
                    }
                    </div>
                }
            {!tryAgain && loadingState && <div className="loader"></div>}
            {tryAgain && 
                <div className="try-again">
                    <button id="try-again">Reload</button>
                    <div>Check your internet connection and try again</div>
                </div>
            }
        </div>
    )
}