import { useState } from "react";
import { Sidebar as SBar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { DRAWER_WIDTH } from "../constant";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
      }}
    >
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

export default function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  //   const user = useSelector((state) => state.user.user);

  return (
    <Box component="nav" sx={{ flexShrink: { sm: 0 } }}>
      <Box
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
          },
        }}
      >
        <SBar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!isCollapsed && (
              <Box mb="25px">
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`${user.pictureUrl}`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box> */}
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    LILI
                    {/* {`${user.firstName} ${user.lastName}`} */}
                  </Typography>
                </Box>
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                  <Item
                    title="Dashboard"
                    to="/dashboard"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Content Manager"
                    to="/contentManager"
                    icon={<BarChartOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Plugins
                  </Typography>
                  <Item
                    title="Content-Type Builder"
                    to="/addNewContent"
                    icon={<PieChartOutlineOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Box>
            )}
            {isCollapsed && (
              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title=""
                  to="/dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title=""
                  to="/contentManager"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Plugins
                </Typography>
                <Item
                  title=""
                  to="/addNewContent"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            )}
          </Menu>
        </SBar>
      </Box>
    </Box>
  );
}
Item.propTypes = {
  title: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  selected: PropTypes.any.isRequired,
  setSelected: PropTypes.any.isRequired,
};
