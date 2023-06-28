import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { Crypto } from "../context/CryptoContext";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import {Navigate, useNavigate} from 'react-router-dom'
import { numberWithCommas } from "./banner/Carousel";
import {Pagination} from '@material-ui/lab'
const useStyle = makeStyles(() => ({
    row:{
        backgroundColor:'#16171a',
        cursor:'pointer',
        fontFamily:'Montserrat',
        '&:hover':{
            backgroundColor:'#131111'
        }
    },
    pagination:{
        "&. MuiPaginationItem-root":{
            color:'gold'
        }
    }
}));
const CoinsTable = () => {
  const { currency, symbol } = useContext(Crypto);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page ,setPage] = useState(1)
  const fetchCoin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching coin data : ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoin();
  }, [currency]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    if(!search){
      return coins
    }
    const searchTerm = search.toLowerCase()
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );
  };
  const classes = useStyle(); 
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurruncy prices by market cap
        </Typography>
        <TextField
          label={"Search for a Crypto"}
          variant={"outlined"}
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundClip: "gold" }}></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#FEBC1D" }}>
                <TableRow>
                  {["coin", "price", "24h change", "Market cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: 700,
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row?.name}
                          height={50}
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgray" }}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14,203,129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                       {symbol}
                       {numberWithCommas(row.market_cap.toString().slice(0,-6))}
                       M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
        style={{
            display:'flex',
            width:'100%',
            padding:20,
            justifyContent:'center'
        }}
        classes={{ul:classes.pagination}}
         count={(handleSearch()?.length/10).toFixed(0)}
         onChange={(__,value)=>{
            setPage(value)
            window.scroll(0,450)
         }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
