import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Grid,
} from "@mui/material";
// import logo from "assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useEtherum } from "components/hooks/useEtherum";

const SideMenu = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const useStyles = makeStyles((theme) => ({
    aside: {
      /* width: `${drawerWidth}`, */
      width: "280px",
      background: "#fff",
      paddingLeft: "2em",
      paddingRight: "2em",
      paddingTop: "1em",
      minHeight: "100vh",
      height: "100%",
      position: "fixed",
      overflowY: "hidden",
      zIndex: theme.zIndex.appBar + 1,

      "&:hover": {
        overflowY: "hidden",
      },

      "& .MuiListItemButton-root": {
        display: "flex",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "0.5em",
        padding: "10px 14px",

        "&:hover": {
          background: theme.palette.common.lightBlue,

          "& .MuiSvgIcon-root": {
            stroke: "#3E5EA9",
            fill: "transparent",
          },

          "& .MuiTypography-root": {
            color: theme.palette.common.blue,
          },

          "& .message-icon": {
            color: theme.palette.common.blue,
          },
        },
      },

      "& .MuiListItemIcon-root": {
        display: "flex",
        alignItems: "center",
        minWidth: 22,
      },

      "& .MuiSvgIcon-root": {
        fontSize: "2rem",
        stroke: "#8D9091",
        fill: "transparent",

        "&:hover": {
          /* color: "#3E5EA9", */
          stroke: "#3E5EA9",
          fill: "transparent",
        },
      },

      "& .MuiTypography-root": {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#474951",
      },

      "& .MuiListItemButton-root.Mui-selected": {
        backgroundColor: theme.palette.common.lightBlue,
        color: theme.palette.common.blue,

        "& .MuiSvgIcon-root": {
          stroke: "#3E5EA9",
          fill: "transparent",
        },

        "&:hover": {
          backgroundColor: theme.palette.common.lightRed,
        },

        "& .MuiListItemIcon-root": {
          color: theme.palette.common.red,
        },

        "& .MuiTypography-root": {
          color: theme.palette.common.red,
          fontWeight: 500,
        },
      },

      "&::-webkit-scrollbar": {
        width: ".85rem",
      },

      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 1rem rgba(0, 0, 0, 0.2)",
      },

      "&::-webkit-scrollbar-thumb": {
        borderRadius: ".5rem",
        background: theme.palette.common.lightGrey,
      },
    },
    logoWrapper: {
      paddingTop: "0.2rem",
      paddingBottom: "0.5em",
      paddingLeft: "1em",
    },
    logout: {
      "&.MuiListItemButton-root": {
        marginTop: "5rem",

        "& .MuiTypography-root": {
          color: "#ED3237 !important",
        },
      },
    },
  }));
  const classes = useStyles();
  const { account, contract } = useEtherum();
  console.log(contract);
  const menu = [
    {
      name: "Home",
      href: "/",
      id: 1,
    },
    {
      name: "Add Invoice",
      href: "/add",
      id: 2,
    },
    {
      name: "Withdraw",
      href: "/withdraw",
      id: 3,
    },
    {
      name: "Deposit",
      href: "/deposit",
      id: 4,
    },
  ];
  const menu2 = [
    {
      name: "Total Employees",
      href: "/employees",
      id: 1,
    },
    {
      name: "Add Invoice",
      href: "/add",
      id: 2,
    },
    {
      name: "Withdraw",
      href: "/withdraw",
      id: 3,
    },
    {
      name: "Deposit",
      href: "/deposit",
      id: 4,
    },
  ];
  const array =
    account === "0x774B716ee5176f7f4eE429F62F688e0AC2e6d504" ? menu : menu2;
  return (
    <>
      <Grid
        className={classes.aside}
        sx={{ borderRight: "1px solid rgba(229, 229, 229, 0.5)" }}
      >
        <div className={classes.logoWrapper}>
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <List>
          {array.map((menu) => {
            return (
              <ListItemButton
                disableRipple
                key={menu.id}
                onClick={() => setSelectedMenu(menu.id)}
                selected={selectedMenu === menu.id}
                component={Link}
                to={`/dashboard${menu.href}`}
              >
                <ListItemText>{menu.name}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </Grid>
    </>
  );
};

SideMenu.propTypes = {
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
};

export default SideMenu;
