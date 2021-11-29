import "../css/Card.css";
interface Props{
    currency_name ?:string,
    currency_symbol? :string,
    price ?:string,
    logo ?:string,
}
const Card :React.FC<Props> = ({currency_name, 
currency_symbol,
price,
logo
})=>{
    const calcPrize = (price_currency :string | undefined)=>{
        const regex_pattern1 = /(?<=\d+\.\d{2})\d+/;
        if (price_currency){
            let price_curr :string=price_currency.replace(regex_pattern1, "");
            return price_curr;
        }else{return 0}
    }

    return (
        <div id="Card">
            <img src={logo} alt="Cryto Coin" />
            <div className="coin_props">
                <div>Name: {currency_name}</div>
                <div>Currency: {currency_symbol}</div>
                <div>Price: {calcPrize(price)} USD</div>
            </div>
        </div>
    )
}

export default Card;