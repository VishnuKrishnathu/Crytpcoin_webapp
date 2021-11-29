import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import CoinInfoPage from "./components/CoinInfoPage";
import LoginPage from "./components/LoginPage";
import ErrorPage from "./components/ErrorPage";
import WalletHistory from "./components/WalletHistory";
import SignupPage from "./components/SignupPage";
import Guide from "./components/Guide";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const stripePromise = loadStripe("pk_test_51IlSFtSC5EizyScKyNhFHgoxtl5eLQTdyBkL0ExEVTmZfHlRnpHwRaROGFwzBPSTzGYTtA9ecMempc5iSefdGcA700mM11YTy8");

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/">
            <NavBar />
            <SideBar />
            <HomePage />
          </Route>
          <Route path="/page-not-found">
            <ErrorPage />
          </Route>
          <Route path="/wallet">
            <NavBar />
            <SideBar />
            <WalletHistory />
          </Route>
          <Route path="/guide">
            <Guide />
          </Route>
          <Route path="/:id">
            <Elements stripe= {stripePromise}>
              <NavBar />
              <SideBar />
              <CoinInfoPage />
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
