import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import DashboardCard from "./DashboardCard";
import ChartTitle from "./ChartTitle";

const numberFormatter = new Intl.NumberFormat("en-IN");

function truncateLabel(label = "", max = 16) {
  if (label.length <= max) return label;
  return `${label.slice(0, max - 1)}…`;
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const { plant, count } = payload[0].payload;

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
        {plant}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {numberFormatter.format(count)} open NCR{count === 1 ? "" : "s"}
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
      <WarningAmberOutlinedIcon sx={{ fontSize: 36, opacity: 0.4 }} />
      <Typography variant="body2" color="text.secondary">
        No open NCR data available
      </Typography>
    </Box>
  );
}

export default function OpenPlantChart({ data = [] }) {
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
  }, [data]);

  const hasData = chartData.length > 0;

  return (
    <DashboardCard>
      <ChartTitle>Open NCRs by Plant</ChartTitle>

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {!hasData ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
              barCategoryGap={chartData.length > 6 ? "20%" : "32%"}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke={theme.palette.divider}
              />

              <XAxis
                type="number"
                allowDecimals={false}
                tickFormatter={(v) => numberFormatter.format(v)}
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={false}
                label={{
                  value: "Number of Open NCRs",
                  position: "insideBottom",
                  offset: -4,
                  fontSize: 11,
                  fill: theme.palette.text.secondary,
                }}
              />

              <YAxis
                type="category"
                dataKey="plant"
                width={110}
                tickFormatter={(v) => truncateLabel(v)}
                tick={{ fontSize: 12, fill: theme.palette.text.primary }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: theme.palette.action.hover }}
              />

              <Bar
                dataKey="count"
                fill={theme.palette.warning.main}
                radius={[0, 6, 6, 0]}
                maxBarSize={28}
                isAnimationActive
                animationDuration={500}
                animationEasing="ease-out"
                activeBar={{ fill: theme.palette.warning.dark }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </DashboardCard>
  );
}