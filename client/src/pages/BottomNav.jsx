import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={pathname}
        onChange={(_, value) => navigate(value)}
        showLabels
      >
        <BottomNavigationAction
          value="/dashboard"
          label="Dashboard"
          icon={<HomeOutlinedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
