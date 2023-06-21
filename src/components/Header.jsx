import {
  AppBar,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Select,
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Crypto } from "../context/CryptoContext";

const useStyles = makeStyles(()=>({
    title:{
        flex:1,
        color:'gold',
        fontFamily:'Montserrat',
        fontWeight:'bold',
        cursor:'pointer',
    }
}))
const Header = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const {currency,setCurrency} = useContext(Crypto)
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:'dark'
        }
    })
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography className={classes.title} onClick={()=>navigate('/')} variant="h6">Crypto Tracker</Typography>
          <Select
            variant="outlined"
            style={{
              height: 40,
              width: 100,
              marginRight: 15,
            }}
            onChange={(e)=>setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
   </ThemeProvider>
  );
};

export default Header;
