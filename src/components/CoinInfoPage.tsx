/*
Build a page not found page and redirect
invalid ids to that page
*/
import {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import "../css/CoinInfoPage.css";
import APIcallsfunc from "./API";

type coininfo ={
    logo_url : string;
    id : string;
    name : string;
    website_url : string;
    description : string;
    markets_count : string;
    discord_url : string;
    facebook_url : string;
    github_url : string;
    linkedin_url : string;
    reddit_url : string;
    telegram_url : string;
    twitter_url : string;
    whitepaper_url : string;
    youtube_url : string;
}

export default function CoinInfoPage(){
    const history = useHistory();
    const APIobject = APIcallsfunc();
    const card_styling = {
        style:{
            base:{
                iconColor:'#000000',
                backgroundColor:'#537d7d',
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder':{
                    color: '#000000',
                },
            },
            invalid: {
                fontSize: '16px',
                color: '#537d7d',
            },
            complete : {
                backgroundColor: '#365252',
            },
            empty :{
                backgroundColor: "#537d7d",
            }
        },
    }
    const stripe = useStripe();
    const elements = useElements();
    const id :{id : string}= useParams();
    const [coinData, setCoinData] = useState<coininfo[] | undefined>();
    const [loginSuccess, setLoginSuccess] = useState<Boolean>(false);
    const [paymentState, setPaymentState] = useState<Boolean>(false);
    const [paymentError, setPaymentError] = useState<Boolean>(false);
    const [paymentErrorText, setPaymentErrorText] = useState<String | string | undefined>("");
    useEffect(()=>{
        fetch(APIobject.URL, {
            headers: APIobject.headers
        }).then(res => res.json())
        .then(data => {
            if(data.logged){
                console.log(data);
                setLoginSuccess(true);
                return;
            }
            setLoginSuccess(false);
        }).catch(err => setLoginSuccess(false));
    },[APIobject]);
    useEffect(() => {
        const key :string = '66922aeaa211b6765271e517b079a07c';
        const URL :string = `https://api.nomics.com/v1/currencies?key=${key}&ids=${id.id}`;
        fetch(URL).then(res => res.json()).then(data => {
            if (data.length === 1) setCoinData(data);
            else {
                history.push("/page-not-found");
            }
        }).catch(err => console.log(err));
        console.log(new Date().getDate());
    }, [id, history])

    const handlePayment = async()=>{
        setPaymentState(true);
        const paymentamount = (document.getElementById("payment-amount") as HTMLInputElement);
        if(paymentamount.validity.valid && parseInt(paymentamount.value) > 100){
            if (!stripe || !elements){
                return;
            }
            const cardElement = elements?.getElement(CardElement);
            if (cardElement){
                const {error, paymentMethod} = await stripe?.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                });
                if (error){
                    await setPaymentError(true);
                    await setPaymentErrorText(error.message);
                    setPaymentState(false);
                    return;
                }
                /// handling payment
                const date = new Date();
                const bodydata = {
                    cryptoID : id.id,
                    paymentamount: parseInt(paymentamount.value),
                    paymentid: paymentMethod?.id,
                    paymentdate: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${date.getHours()}:${date.getMinutes()}`
                };
                await fetch(`${APIobject.URL}make-payment`, {
                    method:'POST',
                    headers: APIobject.headers,
                    body: JSON.stringify(bodydata)
                }).then(res => res.json()).then(data => console.log(data))
                .catch(err => console.log(err));
            }

        };
        setPaymentState(false);
    }

    return (
        <div className="CoinInfoPage">
            <div className="crypto-summary">
                <img src={coinData?.[0]?.logo_url} alt="crypto"/>
                <div>
                    <span>Crypro ID:</span> {coinData?.[0]?.id}
                    <br/><br/>
                    <span>Crypto name:</span> {coinData?.[0]?.name}
                    <br/><br/>
                    <span>Website url:</span> <a href={coinData?.[0]?.website_url}>{coinData?.[0]?.website_url}</a><br/><br/>
                    <span>Markets Count:</span> {coinData?.[0]?.markets_count}
                </div>
            </div>
            <div className="crypto-community-urls">
                <div><span>Discord URL: </span></div><div><a href={coinData?.[0]?.discord_url}>{coinData?.[0]?.discord_url}</a></div>
                <div><span>Facebook URL: </span></div><div><a href={coinData?.[0]?.facebook_url}>{coinData?.[0]?.facebook_url}</a></div>
                <div><span>Github URL: </span></div><div><a href={coinData?.[0]?.github_url}>{coinData?.[0]?.github_url}</a></div>
                <div><span>Linkedin URL: </span></div><div><a href={coinData?.[0]?.linkedin_url}>{coinData?.[0]?.linkedin_url}</a></div>
                <div><span>Telegram URL: </span></div><div><a href={coinData?.[0]?.telegram_url}>{coinData?.[0]?.telegram_url}</a></div>
                <div><span>Reddit URL: </span></div><div><a href={coinData?.[0]?.reddit_url}>{coinData?.[0]?.reddit_url}</a></div>
                <div><span>Twitter URL: </span></div><div><a href={coinData?.[0]?.twitter_url}>{coinData?.[0]?.twitter_url}</a></div>
                <div><span>Whitepaper URL: </span></div><div><a href={coinData?.[0]?.whitepaper_url}>{coinData?.[0]?.whitepaper_url}</a></div>
                <div><span>YouTube URL: </span></div><div><a href={coinData?.[0]?.youtube_url}>{coinData?.[0]?.youtube_url}</a></div>
            </div>
            <div className="crypto-description">
                <div>Description: </div>
                {coinData?.[0]?.description}
            </div>
            {loginSuccess &&
            <div className="stripe-payment">
                <CardElement options={card_styling}/>
                <div className="payment-amount">Amount :<input type="number" id="payment-amount"/><span>(USD)</span></div>
                {paymentError && <div style={{color: "red"}}>{paymentErrorText}</div>}
                {!paymentState && <button onClick={handlePayment}>Make Payment</button>}
                {paymentState && <button disabled style={{background:"grey"}}>Please Wait...</button>}
            </div>}
            {!loginSuccess && 
                <div style={{color: "red"}}>
                    <a href="login/">Login</a> to your account to buy coins
                </div>
            }
        </div>
    )
}