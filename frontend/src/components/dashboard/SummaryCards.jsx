import { Grid, Typography, Box, alpha } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import DashboardCard from "./DashboardCard";

const COLORS = {
  blue: "#2563EB",
  red: "#DC2626",
  green: "#16A34A",
  orange: "#EA580C",
  purple: "#7C3AED",
};

const numberFormatter = new Intl.NumberFormat("en-IN");

function formatValue(value) {
  return typeof value === "number" ? numberFormatter.format(value) : value;
}

function StatCard({ title, value, subtitle, color, icon }) {
  return (
    <DashboardCard
      sx={{
        p: 0,
        overflow: "hidden",
      }}
    >
      {/* Status accent bar */}
      <Box sx={{ height: 3, bgcolor: color, flexShrink: 0 }} />

      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.6,
              fontSize: "0.7rem",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            mt={0.75}
            sx={{
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            {formatValue(value)}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
                fontSize: "0.78rem",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2,
            bgcolor: alpha(color, 0.12),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </Box>
    </DashboardCard>
  );
}

export default function SummaryCards({ dashboard }) {
  if (!dashboard) return null;

  const isPositiveChange = dashboard.weekly_change >= 0;
  const changeColor = isPositiveChange ? COLORS.green : COLORS.red;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          title="Total NCR"
          value={dashboard.summary.total}
          color={COLORS.blue}
          icon={<AssessmentIcon sx={{ color: COLORS.blue, fontSize: 28 }} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          title="Open NCR"
          value={dashboard.summary.open}
          color={COLORS.red}
          icon={<WarningAmberIcon sx={{ color: COLORS.red, fontSize: 28 }} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          title="Closed NCR"
          value={dashboard.summary.closed}
          color={COLORS.green}
          icon={<CheckCircleIcon sx={{ color: COLORS.green, fontSize: 28 }} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          title="Current Week"
          value={dashboard.current_week.count}
          subtitle={`${dashboard.current_week.start} - ${dashboard.current_week.end}`}
          color={COLORS.orange}
          icon={
            <CalendarMonthIcon sx={{ color: COLORS.orange, fontSize: 28 }} />
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          title="Weekly Change"
          value={`${isPositiveChange ? "+" : ""}${dashboard.weekly_change}%`}
          subtitle="Compared to Previous Week"
          color={changeColor}
          icon={
            isPositiveChange ? (
              <TrendingUpIcon sx={{ color: changeColor, fontSize: 28 }} />
            ) : (
              <TrendingDownIcon sx={{ color: changeColor, fontSize: 28 }} />
            )
          }
        />
      </Grid>
    </Grid>
  );
}