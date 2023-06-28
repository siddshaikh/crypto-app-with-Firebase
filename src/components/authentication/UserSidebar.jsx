import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Drawer } from "@material-ui/core";
import { Crypto } from "../../context/CryptoContext";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
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
  coin: {
    padding: 10,
    color: "black",
    borderRadius: 5,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});

const UserSidebar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, watchList, symbol } = useContext(Crypto);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
                  {watchList.length === 0 ? (
                    <span>No coins in watchlist</span>
                  ) : (
                    watchList.map((coinId) => {
                      return (
                        <div className={classes.coin} key={coinId}>
                          <span>{coinId}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;
