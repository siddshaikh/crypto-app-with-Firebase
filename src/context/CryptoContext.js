import React, { createContext, useEffect, useState } from "react";

export const Crypto = createContext();

export const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const[sample,setSample] = useState('sample hai bhai')

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol,sample }}>
      {children}
    </Crypto.Provider>
  );
};
