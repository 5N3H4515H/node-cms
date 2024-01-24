import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../api/getUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import Sidebar from "../pages/SideBar";
import { ColorModeContext, useMode } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "../pages/TopBar";
import BottomNav from "../pages/BottomNav";
import { DRAWER_WIDTH } from "../constant";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // if (isLoading) return <p>Loading...</p>;
  // if (user)
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <div
            className="flex-container"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TopBar setIsSidebar={setIsSidebar} />
            <Sidebar isSidebar={isSidebar} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              }}
            >
              <Outlet />
              <BottomNav />
            </Box>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
  // else return <Navigate to="/" />;
};

export default AuthLayout;
