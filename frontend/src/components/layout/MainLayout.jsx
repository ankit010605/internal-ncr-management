import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

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
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FactoryIcon from "@mui/icons-material/Factory";

const drawerWidth = 260;

// Dark, industrial-analytics palette. Centralized here so the whole
// shell (sidebar, app bar, dividers, text) stays visually consistent.
const PRIMARY = "#3B82F6";
const BACKGROUND = "#0B1220";
const SURFACE = "#0F1A2E";
const BORDER = "rgba(255, 255, 255, 0.08)";
const TEXT_PRIMARY = "#F1F5F9";
const TEXT_SECONDARY = "#94A3B8";
const TEXT_MUTED = "#64748B";

const navItems = [
  { label: "Dashboard", to: "/", icon: <DashboardIcon /> },
  { label: "Create NCR", to: "/create-ncr", icon: <AddBoxIcon /> },
  { label: "NCR List", to: "/ncr-list", icon: <ListAltIcon /> },
  { label: "Reports", to: "/reports", icon: <AssessmentIcon /> },
  { label: "Plant Master", to: "/reports", icon: <FactoryIcon /> },
];

export default function MainLayout({ children }) {

  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:900px)");

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
        bgcolor: SURFACE,
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
            sx={{ fontWeight: 700, lineHeight: 1.2, color: TEXT_PRIMARY }}
          >
            NCR System
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: TEXT_MUTED }}
          >
            Quality Management
          </Typography>
        </Box>

      </Box>

      <Divider sx={{ borderColor: BORDER }} />

      <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: TEXT_MUTED,
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: "0.68rem",
          }}
        >
          NAVIGATION
        </Typography>
      </Box>

      <List sx={{ px: 1.5, pb: 2, flexGrow: 1 }}>

        {navItems.map((item) => {

          const selected = location.pathname === item.to;

          return (

            <ListItemButton
              key={item.label}
              component={Link}
              to={item.to}
              onClick={() => isMobile && setMobileOpen(false)}
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                px: 2,
                py: 1.1,
                color: selected ? "#FFFFFF" : TEXT_SECONDARY,
                bgcolor: selected ? PRIMARY : "transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: selected
                    ? PRIMARY
                    : "rgba(255, 255, 255, 0.06)",
                },
              }}
            >

              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: selected ? "#FFFFFF" : TEXT_MUTED,
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

      <Divider sx={{ borderColor: BORDER }} />

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
          <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_PRIMARY }}>
            Quality Team
          </Typography>
          <Typography variant="caption" sx={{ color: TEXT_MUTED }}>
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
          bgcolor: SURFACE,
          color: TEXT_PRIMARY,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >

        <Toolbar sx={{ py: 1 }}>

          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "inline-flex", md: "none" },
              color: TEXT_PRIMARY,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.3 }}
            >
              Internal NCR Management System
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: TEXT_MUTED, letterSpacing: 0.2 }}
            >
              Quality Department Overview
            </Typography>
          </Box>

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
              bgcolor: SURFACE,
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
              mt: 9,
              borderRight: `1px solid ${BORDER}`,
              bgcolor: SURFACE,
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
          mt: 9,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >

        {children}
        <Outlet />

      </Box>

    </Box>

  );

}