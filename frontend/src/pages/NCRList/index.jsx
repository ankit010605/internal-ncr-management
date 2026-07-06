import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FactoryIcon from "@mui/icons-material/Factory";

const drawerWidth = 260;

const PRIMARY = "#D97706";
const BACKGROUND = "#F5F7FA";

const navItems = [
  { label: "Dashboard", to: "/", icon: <DashboardIcon /> },
  { label: "Create NCR", to: "/create-ncr", icon: <AddBoxIcon /> },
  { label: "NCR List", to: "/ncr-list", icon: <ListAltIcon /> },
  { label: "Reports", to: "/reports", icon: <AssessmentIcon /> },
  { label: "Plant Master", to: "/reports", icon: <FactoryIcon /> },
];

const MainLayout = ({ children }) => {

  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#FFFFFF",
      }}
    >

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          py: 2.5,
        }}
      >

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            bgcolor: PRIMARY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FactoryIcon sx={{ color: "#FFFFFF", fontSize: 22 }} />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.2, color: "#1F2937" }}
          >
            NCR System
          </Typography>
          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            Quality Management
          </Typography>
        </Box>

      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>

        {navItems.map((item) => {

          const selected = location.pathname === item.to;

          return (

            <ListItemButton
              key={item.label}
              component={Link}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                px: 2,
                py: 1.1,
                color: selected ? PRIMARY : "#4B5563",
                bgcolor: selected ? "rgba(217, 119, 6, 0.1)" : "transparent",
                borderLeft: selected
                  ? `3px solid ${PRIMARY}`
                  : "3px solid transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: selected
                    ? "rgba(217, 119, 6, 0.14)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >

              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: selected ? PRIMARY : "#9CA3AF",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: selected ? 600 : 500,
                  fontSize: "0.92rem",
                }}
              />

            </ListItemButton>

          );

        })}

      </List>

      <Divider />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          py: 2,
        }}
      >

        <Avatar sx={{ bgcolor: PRIMARY, width: 36, height: 36, fontSize: 14 }}>
          QA
        </Avatar>

        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1F2937" }}>
            Quality Team
          </Typography>
          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            SSD Plant
          </Typography>
        </Box>

      </Box>

    </Box>

  );

  return (

    <Box sx={{ display: "flex", bgcolor: BACKGROUND, minHeight: "100vh" }}>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1201,
          bgcolor: "#FFFFFF",
          color: "#1F2937",
          borderBottom: "1px solid #E5E7EB",
        }}
      >

        <Toolbar>

          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "inline-flex", md: "none" },
              color: "#1F2937",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1F2937" }}>
            Internal NCR Management System
          </Typography>

        </Toolbar>

      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: 8,
              borderRight: "1px solid #E5E7EB",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>

      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: 8,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >

        {children}

      </Box>

    </Box>

  );

};

export default MainLayout;