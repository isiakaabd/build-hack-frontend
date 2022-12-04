import { Grid, AppBar, Toolbar, Container } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { shortAccount } from "components/helpers";
import Copy from "components/utilities/Copy";
const pages = [
  {
    title: "Register",
    route: "/register",
  },
  {
    title: "Login",
    route: "/login",
  },
];

function Navbar({ handleConnect, contract, account }) {
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ background: "inherit", height: "80px", justifyContent: "center" }}
    >
      <Container>
        <Toolbar disableGutters>
          <Grid item container>
            <List
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                color: "#fff",
              }}
            >
              <ListItemButton
                sx={{ flexGrow: 0 }}
                disableRipple
                component={Link}
                to="/"
              >
                <ListItemIcon>
                  <AdbIcon
                    sx={{
                      color: "#fff",
                    }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ color: "#fff" }}>Pay-Right</ListItemText>
              </ListItemButton>
              <ListItemButton
                sx={{ flexGrow: 0 }}
                disableRipple
                component={Link}
                to="/about"
              >
                <ListItemText sx={{ color: "#fff" }}>About</ListItemText>
              </ListItemButton>
              {contract &&
                pages.map((page) => (
                  <ListItemButton
                    disableRipple
                    sx={{ flexGrow: 0 }}
                    key={page.route}
                    component={Link}
                    to={page.route}
                    onClick={() => {
                      if (page.route === "/login") {
                        localStorage.setItem("auth", true);
                      }
                    }}
                    //   selected={selectedMenu === page.route}
                  >
                    <ListItemText>{page.title}</ListItemText>
                  </ListItemButton>
                ))}
              <ListItemButton
                disableRipple
                sx={{ flexGrow: 0, padding: "2em", borderRadius: "2rem" }}
                onClick={() => handleConnect()}
              >
                <ListItemText sx={{ color: "#fff" }}>
                  {account ? shortAccount(account) : "connect Wallet"}
                </ListItemText>
                {account && <Copy text={account} name="Wallet ID Copied" />}
              </ListItemButton>
            </List>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
