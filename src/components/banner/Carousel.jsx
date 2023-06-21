import { makeStyles } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { Crypto } from "../../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export const numberWithCommas = (x) =>{return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "+" )
}

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    cursor:'pointer',
    textTransform:'uppercase',
    color:'white'
  }
}));
const Carousel = () => {
  const classes = useStyles();
  const { currency, symbol } = useContext(Crypto);
  const [trending, setTrending] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height={"80"}
          style={{ marginBottom: 10 }}
        />
        <span style={{color:profit>0 ? "rgb(14,203,129)":"red",fontWeight:500}}>
          {coin?.symbol}
          &nbsp;
          <span>
          {coin?.price_change_percentage_24h?.toFixed(2)}%

           </span>
        </span>
        <span style={{fontSize:32,fontWeight:500}}>
            {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
