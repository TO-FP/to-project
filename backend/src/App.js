import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Navbar, Main, Loading } from "./components";
import { Login } from "./pages";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AdminAPI } from "./API";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isUpdated, setIsUpdated] = useState();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(false);
      localStorage.clear();
    }, 500);
  };

  const handleUp = async () => {
    setIsUpdated(new Date());
    return true;
  };

  useEffect(async () => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const authorized = await AdminAPI(access_token);

      if (authorized.status === 200) {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      // setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <Loading />
        ) : isLoggedIn ? (
          <>
            <Navbar handleLogout={handleLogout} isUpdated={isUpdated} />
            <Main handleUpdateProfile={() => handleUp()} />
          </>
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
