import React from "react";
import { CardContent, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
    padding: "1.5rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
}));
const Cards = ({ connectWallet }) => {
  const classes = useStyles();
  return (
    <Card className={classes.container} onClick={() => connectWallet()}>
      <CardContent>
        <Typography variant="h2" textAlign="center" gutterBottom>
          👋 Welcome to CryptOpine
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets10.lottiefiles.com/packages/lf20_gftlvsbm.json"
          class="animation"
          style={{ maxWidth: "300px" }}
        />
      </CardContent>
      {/* <CardContent>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Login with your Wallet
        </Typography>
      </CardContent> */}
    </Card>
  );
};
export default Cards;
