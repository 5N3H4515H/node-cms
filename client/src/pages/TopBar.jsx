import { Box, IconButton, useTheme, CssBaseline } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLogout } from "../api/userLogout";
import { useNavigate } from "react-router-dom";
import { DRAWER_WIDTH } from "../constant";

export default function TopBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout()
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
        position="fixed"
        elevation={0}
      >
        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
      {/* </AppBar> */}
    </>
  );
}
