import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Userlist from "./component/Userlist";

export default function Profile() {
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:7777/api/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          // alert("authen sucess");
        } else {
          // alert("authen failed");
          localStorage.removeItem("token");
          window.location = "/";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: "100%" }}
        display="absolute"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ width: 300, margin: "16px auto 16px" }}>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            User list
          </Typography>
        </Box>
        <Userlist></Userlist>
      </Box>
    </Box>
  );
}
