import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Button,
  Stack,
} from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

import api from "../api/api";
import MainLayout from "../components/layout/MainLayout";

import SummaryCards from "../components/dashboard/SummaryCards";
import PlantChart from "../components/dashboard/PlantChart";
import WeeklyComparison from "../components/dashboard/WeeklyComparison";
import WeeklyTrend from "../components/dashboard/WeeklyTrend";
import ContractorChart from "../components/dashboard/ContractorChart";
import OpenPlantChart from "../components/dashboard/OpenPlantChart";

// Fixed heights keep chart cards visually aligned across a row,
// regardless of how much data each chart renders.
const CHART_CARD_HEIGHT = 420;

function DashboardSkeleton() {
  return (
    <Box>
      {/* KPI row skeleton */}
      <Grid container spacing={3} mb={1}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                height: 120,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={40} sx={{ mt: 1 }} />
              <Skeleton variant="text" width="50%" height={16} sx={{ mt: 1 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chart grid skeleton */}
      <Grid container spacing={3} mt={1}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                height: CHART_CARD_HEIGHT,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Skeleton variant="text" width="35%" height={28} sx={{ mb: 2 }} />
              <Skeleton
                variant="rounded"
                width="100%"
                height={CHART_CARD_HEIGHT - 80}
              />
            </Paper>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              height: CHART_CARD_HEIGHT,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Skeleton variant="text" width="25%" height={28} sx={{ mb: 2 }} />
            <Skeleton
              variant="rounded"
              width="100%"
              height={CHART_CARD_HEIGHT - 80}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function DashboardError({ onRetry }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        py: 8,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1.5,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <ErrorOutlineRoundedIcon sx={{ fontSize: 48, color: "error.main" }} />
      <Typography variant="h6" fontWeight={700}>
        Failed to load dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 380 }}>
        There was a problem retrieving the latest NCR data. Please check your
        connection and try again.
      </Typography>
      <Button
        variant="contained"
        disableElevation
        startIcon={<RefreshRoundedIcon />}
        onClick={onRetry}
        sx={{ mt: 1, textTransform: "none", fontWeight: 600, borderRadius: 2 }}
      >
        Retry
      </Button>
    </Paper>
  );
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDashboard = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await api.get("/dashboard");

      setDashboard(res.data.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      if (!isRefresh) {
        setDashboard(null);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <MainLayout>
      <Box>
        {/* Page Heading */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={4}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2.5,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FactoryRoundedIcon sx={{ color: "common.white", fontSize: 26 }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                lineHeight={1.2}
                color="text.primary"
              >
                Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, letterSpacing: 0.2 }}
              >
                Internal NCR Management System — Quality Overview
              </Typography>
            </Box>
          </Stack>

          {!loading && dashboard && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              {lastUpdated && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  Updated{" "}
                  {lastUpdated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              )}
              <Tooltip title="Refresh data">
                <span>
                  <IconButton
                    onClick={() => loadDashboard(true)}
                    disabled={refreshing}
                    size="small"
                    sx={{
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.secondary",
                      "&:hover": {
                        bgcolor: "action.hover",
                        color: "text.primary",
                      },
                    }}
                  >
                    <RefreshRoundedIcon
                      fontSize="small"
                      sx={{
                        animation: refreshing
                          ? "spin 0.8s linear infinite"
                          : "none",
                        "@keyframes spin": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          )}
        </Stack>

        {/* Loading State */}
        {loading && <DashboardSkeleton />}

        {/* Error State */}
        {!loading && !dashboard && (
          <DashboardError onRetry={() => loadDashboard()} />
        )}

        {/* Content */}
        {!loading && dashboard && (
          <Fade in timeout={400}>
            <Box>
              {/* Summary Cards */}
              <SummaryCards dashboard={dashboard} />

              <Grid container spacing={3} mt={0.5} alignItems="stretch">
                {/* Plant-wise NCR */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ height: CHART_CARD_HEIGHT }}>
                    <PlantChart data={dashboard.plant_wise} />
                  </Box>
                </Grid>

                {/* Open NCR by Plant */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ height: CHART_CARD_HEIGHT }}>
                    <OpenPlantChart data={dashboard.open_by_plant} />
                  </Box>
                </Grid>

                {/* Weekly Trend */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ height: CHART_CARD_HEIGHT }}>
                    <WeeklyTrend data={dashboard.weekly_trend} />
                  </Box>
                </Grid>

                {/* Weekly Comparison */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ height: CHART_CARD_HEIGHT }}>
                    <WeeklyComparison dashboard={dashboard} />
                  </Box>
                </Grid>

                {/* Contractor-wise NCR */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ height: CHART_CARD_HEIGHT }}>
                    <ContractorChart data={dashboard.contractor_wise} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )}
      </Box>
    </MainLayout>
  );
}