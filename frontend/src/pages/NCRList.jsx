import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Skeleton,
  Grid,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

import NCRTable from "../components/ncr/NCRTable";
import MainLayout from "../components/layout/MainLayout";

const PRIMARY = "#D97706";

export default function NCRList() {
    const navigate = useNavigate();

  const [ncrs, setNcrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [plantFilter, setPlantFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    loadNCRs();
  }, []);

  const loadNCRs = async () => {

    try {

      setLoading(true);

      const res = await api.get("/ncr");

      setNcrs(res.data.data);
      

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const plants = useMemo(
    () => [...new Set(ncrs.map((n) => n.plant).filter(Boolean))],
    [ncrs]
  );

  const filteredNcrs = useMemo(() => {

    return ncrs.filter((n) => {

      const matchesSearch = search
        ? [n.ncr_number, n.project_name, n.contractor, n.drawing_number]
            .some((field) =>
              String(field || "")
                .toLowerCase()
                .includes(search.toLowerCase())
            )
        : true;

      const matchesPlant =
        plantFilter === "All" ? true : n.plant === plantFilter;

      const matchesDate = dateFilter
        ? String(n.issue_date || "").startsWith(dateFilter)
        : true;

      return matchesSearch && matchesPlant && matchesDate;

    });

  }, [ncrs, search, plantFilter, dateFilter]);

  const hasActiveFilters = search || plantFilter !== "All" || dateFilter;

  const clearFilters = () => {
    setSearch("");
    setPlantFilter("All");
    setDateFilter("");
  };

  return (

    <MainLayout>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 12000, color: "#FFFFFF" }}>
            Internal NCR List
          </Typography>
          <Typography variant="body2" sx={{ color: "#FFFFFF", mt: 1.0 }}>
            {ncrs.length} total records
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/create-ncr")}
          sx={{
            borderRadius: "8px",
            bgcolor: PRIMARY,
            textTransform: "none",
            px: 3,
            "&:hover": { bgcolor: "#B45F04" },
          }}
        >
          Create NCR
        </Button>

      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 2.5,
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
        }}
      >

        <Grid container spacing={2} alignItems="center">

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by NCR number, project, contractor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Plant"
              value={plantFilter}
              onChange={(e) => setPlantFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FactoryOutlinedIcon sx={{ color: "#9CA3AF", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="All">All Plants</MenuItem>
              {plants.map((p, i) => (
                <MenuItem key={i} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Issue Date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventOutlinedIcon sx={{ color: "#9CA3AF", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <Button
              fullWidth
              disabled={!hasActiveFilters}
              onClick={clearFilters}
              sx={{ textTransform: "none", color: "#6B7280" }}
            >
              Clear
            </Button>
          </Grid>

        </Grid>

      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "12px",
          border: "1px solid #E5E7EB",
        }}
      >

        {loading ? (

          <Box>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={48}
                sx={{ borderRadius: "8px", mb: 1 }}
              />
            ))}
          </Box>

        ) : filteredNcrs.length === 0 ? (

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={8}
          >
            <ListAltOutlinedIcon sx={{ fontSize: 48, color: "#D1D5DB", mb: 1.5 }} />

            <Typography variant="body1" sx={{ fontWeight: 600, color: "#1F2937" }}>
              No NCRs found
            </Typography>

            <Typography variant="body2" sx={{ color: "#9CA3AF", mt: 0.5 }}>
              {hasActiveFilters
                ? "Try adjusting your search or filters"
                : "Create your first NCR to get started"}
            </Typography>
          </Box>

        ) : (

          <NCRTable
            rows={filteredNcrs}
            onRowClick={(id) => navigate(`/ncr/${id}`)}
          />

        )}

      </Paper>

    </MainLayout>

  );

}