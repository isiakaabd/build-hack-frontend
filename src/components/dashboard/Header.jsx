import { shortAccount } from "components/helpers";
import { Grid, Button, Typography } from "@mui/material";
import { useEtherum } from "components/hooks/useEtherum";
import { useEffect, useState } from "react";
const Header = ({ logout, state }) => {
  const { account, contract } = useEtherum();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await contract?.totalRegisteredEmployee();
      if (data) {
        setTotal(data?.toNumber());
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);
  const ac2 = "0x774B716ee5176f7f4eE429F62F688e0AC2e6d504";
  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <h1>
        Welcome {""} {shortAccount(account)}
      </h1>
      <Button sx={{ background: "#fff" }} onClick={logout}>
        Logout
      </Button>
      <Typography
        sx={{
          fontSize: "2rem",
        }}
      >
        {account === ac2 ? "Approval Status" : "Total Employees"}
        {"   "} -{" "}
        <span style={{ color: state?.approved === true ? "green" : "red" }}>
          {account === ac2
            ? state?.approved === true
              ? "Approved"
              : "Not Approved"
            : total}
        </span>
      </Typography>
    </Grid>
  );
};

export default Header;
