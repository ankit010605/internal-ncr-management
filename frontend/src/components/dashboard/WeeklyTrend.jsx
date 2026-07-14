import { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";

import DashboardCard from "./DashboardCard";
import ChartTitle from "./ChartTitle";

const numberFormatter = new Intl.NumberFormat("en-IN");

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const count = payload[0].value;

  return (
    <Paper
      elevation={0}
      sx={{
        px: 1.75,
        py: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="caption" fontWeight={700} sx={{ display: "block" }}>
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {numberFormatter.format(count)} NCR{count === 1 ? "" : "s"}
      </Typography>
    </Paper>
  );
}

function EmptyState() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
        gap: 1,
      }}
    >
      <ShowChartOutlinedIcon sx={{ fontSize: 36, opacity: 0.4 }} />
      <Typography variant="body2" color="text.secondary">
        No weekly trend data available
      </Typography>
    </Box>
  );
}

export default function WeeklyTrend({ data }) {
  const theme = useTheme();

  const hasData = useMemo(() => Array.isArray(data) && data.length > 0, [data]);

  return (
    <DashboardCard>
      <ChartTitle>Weekly NCR Trend</ChartTitle>

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {!hasData ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id="weeklyTrendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.22}
                  />
                  <stop
                    offset="100%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme.palette.divider}
              />

              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={false}
              />

              <YAxis
                allowDecimals={false}
                tickFormatter={(v) => numberFormatter.format(v)}
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={false}
                width={40}
                label={{
                  value: "Number of NCRs",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 11,
                  fill: theme.palette.text.secondary,
                  style: { textAnchor: "middle" },
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: theme.palette.divider, strokeWidth: 1 }}
              />

              <Area
                type="monotone"
                dataKey="count"
                stroke="none"
                fill="url(#weeklyTrendFill)"
                isAnimationActive
                animationDuration={600}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: theme.palette.background.paper,
                  stroke: theme.palette.primary.main,
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: theme.palette.primary.main,
                  stroke: theme.palette.background.paper,
                  strokeWidth: 2,
                }}
                isAnimationActive
                animationDuration={600}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </Box>
    </DashboardCard>
  );
}