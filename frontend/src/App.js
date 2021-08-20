import "./App.css";
import "./Main-home.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Home,
  Register,
  ProductDetail,
  Cart,
  Profile,
  PlaceOrder,
  Product,
  MainSection,
} from "./pages";
import { Footer } from "./component";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const userLogin = (param) => {
    setLogin(param);
  };
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  const getUser = (user) => {
    localStorage.setItem("user_data", JSON.stringify(user));
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);
  console.log(userLogin);
  return (
    <BrowserRouter>
      <div className="main-container">
        {login ? (
          <MainSection login={login} userLogin={userLogin} />
        ) : (
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/login">
              <Login
                userLogin={userLogin}
                getToken={getToken}
                getUser={getUser}
              />
            </Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
