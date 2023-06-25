import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Drawer } from "@material-ui/core";
import { Crypto } from "../../context/CryptoContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../banner/Carousel";
import {AiFillDelete} from 'react-icons/ai'
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospae",
  },
  user: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    marginTop: 15,
    backgroundColor: "#EEBC1D",
    cursor: "pointer",
  },
  watchList: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin:{
    padding:10,
    color:'black',
    borderRadius:5,
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#EEBC1D',
    boxShadow:'0 0 3px black'
  }
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchList, coin,symbol } = useContext(Crypto);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logged out successfully!",
    });
    toggleDrawer();
  };
  const removeFromWatchList = async(coin) =>{
    const coinRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(coinRef, {
        coin: watchList.filter((watch)=> watch !== coin.id)},
        {
          merge:true
        }
      );
      setAlert({
        open: true,
        message: "Removed from  watchlist!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: `${error.message}`,
        type: "error",
      });
    }
  }
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              backgroundColor: "#EEBC1D",
              cursor: "pointer",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.user}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchList}>
                  <span
                    style={{
                      fontSize: 15,
                      textShadow: "0 0 5px black",
                    }}
                  >
                    Watchlist
                  </span>
                  {
                    coin?.map(c=>{
                      if (watchList.includes(c.id))
                      return(
                        <div className={classes.coin}>
                          <span>{c.name}</span>
                          <span style={{display:'flex',gap:8}}>
                            {symbol}
                            {numberWithCommas(c.current_price.toFixed(2))}
                            <AiFillDelete 
                             style={{cursor:'pointer'}}
                             fontSize={'16'}
                             onClick={()=>removeFromWatchList(coin)}
                            />
                          </span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logout}
              >
                Log out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
