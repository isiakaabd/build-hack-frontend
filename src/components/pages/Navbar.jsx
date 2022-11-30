import { Grid, AppBar, Toolbar, Container } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import useAuth from "components/context/useAuth";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

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

function Navbar({ handleConnect }) {
  const { auth } = useAuth();

  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };

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
              {auth &&
                pages.map((page) => (
                  <ListItemButton
                    disableRipple
                    sx={{ flexGrow: 0 }}
                    key={page.route}
                    component={Link}
                    to={page.route}
                    //   selected={selectedMenu === page.route}
                  >
                    <ListItemText>{page.title}</ListItemText>
                  </ListItemButton>
                ))}
              <ListItemButton
                disableRipple
                sx={{ flexGrow: 0 }}
                onClick={() => handleConnect()}
              >
                <ListItemText sx={{ color: "#fff" }}>
                  Connect Your Wallet
                </ListItemText>
              </ListItemButton>
            </List>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
