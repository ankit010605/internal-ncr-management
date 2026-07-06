import { useEffect, useState } from "react";
import api from "../api/api";

import {
  Typography,
  Paper,
  Container,
} from "@mui/material";

import MainLayout from "../components/layout/MainLayout";
import ReportTable from "../components/reports/ReportTable";
import ReportFilters from "../components/reports/ReportFilters";
import { exportToExcel, exportToPDF } from "../utils/exportReports";
import { Button, Stack } from "@mui/material";

export default function Reports() {

  const [reports, setReports] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    plant: "",
    bay: "",
    status: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await api.get("/reports");
      setReports(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredReports = reports.filter((row) => {

    // ---------- SEARCH ----------
    const searchMatch =
      filters.search === "" ||
      row.ncr_number.toLowerCase().includes(filters.search.toLowerCase()) ||
      row.project_name.toLowerCase().includes(filters.search.toLowerCase());

    // ---------- PLANT ----------
    const plantMatch =
      filters.plant === "" ||
      row.plant === filters.plant;

    // ---------- BAY ----------
    const bayMatch =
      filters.bay === "" ||
      row.bay === filters.bay;

    // ---------- STATUS ----------
    const statusMatch =
      filters.status === "" ||
      row.status === filters.status;

    // ---------- DATE FILTER ----------
    const issueDate = new Date(row.issue_date);

    const fromMatch =
      filters.from === "" ||
      issueDate >= new Date(filters.from);

    const toMatch =
      filters.to === "" ||
      issueDate <= new Date(filters.to);

    // ---------- FINAL RETURN ----------
    return (
      searchMatch &&
      plantMatch &&
      bayMatch &&
      statusMatch &&
      fromMatch &&
      toMatch
    );

  });

  return (

    <MainLayout>

      <Container maxWidth="xl">

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          Reports
        </Typography>

        <Paper sx={{ p: 2 }}>

  <ReportFilters
    filters={filters}
    setFilters={setFilters}
  />

  {/* ✅ ADD BUTTONS HERE */}
  <Stack direction="row" spacing={2} mb={2}>

    <Button
      variant="contained"
      color="success"
      onClick={() => exportToExcel(filteredReports)}
    >
      Export Excel
    </Button>

    <Button
      variant="contained"
      color="error"
      onClick={() => exportToPDF(filteredReports)}
    >
      Export PDF
    </Button>

  </Stack>

  {/* TABLE */}
  <ReportTable
    rows={filteredReports}
  />

</Paper>

      </Container>

    </MainLayout>

  );

}