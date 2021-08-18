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
<<<<<<< HEAD
} from "./pages";
import { Footer } from "./component";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/product" component={Product}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/place_order" component={PlaceOrder}></Route>
          <Route path="/product/detail" component={ProductDetail}></Route>
        </Switch>
=======
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

>>>>>>> user
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
