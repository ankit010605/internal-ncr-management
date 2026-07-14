import { Paper, useTheme } from "@mui/material";

/**
 * Shared card wrapper for dashboard KPI/chart tiles.
 *
 * Forwards `sx` and any other props to the root Paper so individual
 * chart/KPI components can extend layout (e.g. flex column + full height)
 * without needing a new wrapper component.
 */
export default function DashboardCard({ children, sx = {}, ...rest }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: theme.palette.divider,
        background: theme.palette.background.paper,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: theme.transitions.create(
          ["box-shadow", "transform", "border-color"],
          { duration: theme.transitions.duration.short }
        ),
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
          borderColor: theme.palette.grey[300],
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
}