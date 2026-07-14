import { Box, Typography, Divider, useTheme, alpha } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";

import DashboardCard from "./DashboardCard";
import ChartTitle from "./ChartTitle";

const numberFormatter = new Intl.NumberFormat("en-IN");

function EmptyState() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
        gap: 1,
      }}
    >
      <InsightsOutlinedIcon sx={{ fontSize: 36, opacity: 0.4 }} />
      <Typography variant="body2" color="text.secondary">
        No weekly comparison data available
      </Typography>
    </Box>
  );
}

export default function WeeklyComparison({ dashboard }) {
  const theme = useTheme();

  if (!dashboard || !dashboard.current_week || !dashboard.previous_week) {
    return (
      <DashboardCard>
        <ChartTitle>Weekly Comparison</ChartTitle>
        <EmptyState />
      </DashboardCard>
    );
  }

  const increase = dashboard.weekly_change >= 0;
  const trendColor = increase ? theme.palette.success.main : theme.palette.error.main;

  const currentCount = dashboard.current_week.count ?? 0;
  const previousCount = dashboard.previous_week.count ?? 0;
  const maxCount = Math.max(currentCount, previousCount, 1);

  return (
    <DashboardCard>
      <ChartTitle>Weekly Comparison</ChartTitle>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box display="flex" justifyContent="space-between" mb={2} gap={2}>
            {/* Current Week */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: "0.7rem",
                }}
              >
                Current Week
              </Typography>

              <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2, mt: 0.5 }}>
                {numberFormatter.format(currentCount)}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {dashboard.current_week.start} - {dashboard.current_week.end}
              </Typography>

              {/* Magnitude bar */}
              <Box
                sx={{
                  mt: 1.25,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: `${(currentCount / maxCount) * 100}%`,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 3,
                    transition: "width 0.5s ease-out",
                  }}
                />
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Previous Week */}
            <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  fontSize: "0.7rem",
                }}
              >
                Previous Week
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                sx={{ lineHeight: 1.2, mt: 0.5, color: "text.secondary" }}
              >
                {numberFormatter.format(previousCount)}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {dashboard.previous_week.start} - {dashboard.previous_week.end}
              </Typography>

              {/* Magnitude bar */}
              <Box
                sx={{
                  mt: 1.25,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.text.secondary, 0.12),
                  overflow: "hidden",
                  ml: "auto",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: `${(previousCount / maxCount) * 100}%`,
                    bgcolor: theme.palette.text.disabled,
                    borderRadius: 3,
                    ml: "auto",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Trend summary */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            py: 2,
            borderRadius: 2.5,
            bgcolor: alpha(trendColor, 0.08),
          }}
        >
          {increase ? (
            <TrendingUpIcon sx={{ color: trendColor, fontSize: 30 }} />
          ) : (
            <TrendingDownIcon sx={{ color: trendColor, fontSize: 30 }} />
          )}

          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: trendColor, lineHeight: 1.1 }}>
              {Math.abs(dashboard.weekly_change)}%
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", textAlign: "center" }}
            >
              vs. Previous Week
            </Typography>
          </Box>
        </Box>
      </Box>
    </DashboardCard>
  );
}