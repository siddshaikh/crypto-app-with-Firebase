import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Crypto } from "../../context/CryptoContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useContext(Crypto);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please enter all the fields",
        type: "error",
      });
    }
    try {
      const result = await signInWithEmailAndPassword(auth,email,password);
      const user = result.user
      setAlert({
        open: true,
        message: `Login Successful , Welcome ${user.email}`,
      });
      
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label=" Enter email "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default Login;
