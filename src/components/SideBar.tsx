import {useHistory, Link} from "react-router-dom";
import Home from "../assets/home.svg";
import Coin from "../assets/coin.svg";
import LogOut from "../assets/logout.svg"
import "../css/SideBar.css";

export default function SideBar(){
    const history = useHistory();

    const logoutEvent = ()=>{
        const token = localStorage.getItem("token");
        if(token?.split(" ")[0]==="Bearer"){
            localStorage.removeItem("token");
        }
        history.push("login");
    }
    return (
        <div className="SideBar">
            <div className="nav_buttons">
                <Link to="/"><img src={Home} alt="home"/></Link>
                <Link to="wallet"><img src={Coin} alt="coins"/></Link>
            </div>
            <button onClick={logoutEvent}>
                <img src={LogOut} alt="logout"/>
            </button>
        </div>
    )
}