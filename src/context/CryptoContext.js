import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import axios from "axios";
export const Crypto = createContext();

export const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const {id} = useParams()
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchList, setWatchList] = useState([]);
  const [coin,setCoin] = useState(null)
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        watchList,
        setWatchList,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};
