import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = ({ user, handleLogout }) => {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", flexDirection: "row", gap: "1em" }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Blogs
              </Link>
              <Link
                to="/users"
                style={{ textDecoration: "none", color: "white" }}
              >
                Users
              </Link>
            </Typography>
            <Typography variant="h5" sx={{ textShadow: "1px 1px 2px #220000" }}>
              Blog App
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "0.4em" }}
            >
              <i>{user.name}</i>
              <Button color="inherit" onClick={handleLogout} variant="outlined">
                Logout
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Menu;
