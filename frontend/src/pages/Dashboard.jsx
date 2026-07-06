import { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Skeleton } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "../api/api";
import MainLayout from "../components/layout/MainLayout";

const COLORS = {
  info: "#2563EB",
  danger: "#DC2626",
  success: "#16A34A",
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/ncr");

      const ncrs = res.data.data;

      setStats({
        total: ncrs.length,
        open: ncrs.filter((n) => n.status === "Open").length,
        closed: ncrs.filter((n) => n.status === "Closed").length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ title, value, icon, color }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "12px",
          bgcolor: `${color}1A`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="body2"
          sx={{ color: "#6B7280", fontWeight: 500, mb: 0.5 }}
        >
          {title}
        </Typography>

        {loading ? (
          <Skeleton variant="text" width={50} height={38} />
        ) : (
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1F2937", lineHeight: 1 }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Paper>
  );

  return (
    <MainLayout>
      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1F2937" }}>
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
          Overview of Non-Conformance Reports across the plant
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            title="Total NCR"
            value={stats.total}
            icon={<AssessmentIcon sx={{ color: COLORS.info, fontSize: 28 }} />}
            color={COLORS.info}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            title="Open NCR"
            value={stats.open}
            icon={<WarningAmberIcon sx={{ color: COLORS.danger, fontSize: 28 }} />}
            color={COLORS.danger}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            title="Closed NCR"
            value={stats.closed}
            icon={<CheckCircleIcon sx={{ color: COLORS.success, fontSize: 28 }} />}
            color={COLORS.success}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
}