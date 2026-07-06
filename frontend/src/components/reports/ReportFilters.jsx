import {
    Grid,
    TextField,
    MenuItem,
    Button,
  } from "@mui/material";
  
  export default function ReportFilters({
    filters,
    setFilters,
  }) {
  
    const handleChange = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleReset = () => {
      setFilters({
        search: "",
        plant: "",
        bay: "",
        status: "",
        from: "",
        to: "",
      });
    };
  
    return (
  
      <Grid container spacing={2} mb={3} alignItems="center">
  
        {/* SEARCH */}
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Search NCR / Project"
            name="search"
            value={filters.search}
            onChange={handleChange}
          />
        </Grid>
  
        {/* PLANT */}
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            select
            label="Plant"
            name="plant"
            value={filters.plant}
            onChange={handleChange}
            MenuProps={{
              PaperProps: { style: { maxHeight: 220 } }
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Plant 1">Plant 1</MenuItem>
            <MenuItem value="Plant 2">Plant 2</MenuItem>
            <MenuItem value="Plant 2A">Plant 2A</MenuItem>
          </TextField>
        </Grid>
  
        {/* BAY */}
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            select
            label="Bay"
            name="bay"
            value={filters.bay}
            onChange={handleChange}
            MenuProps={{
              PaperProps: { style: { maxHeight: 220 } }
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Bay 1">Bay 1</MenuItem>
            <MenuItem value="Bay 2">Bay 2</MenuItem>
            <MenuItem value="Bay 3">Bay 3</MenuItem>
          </TextField>
        </Grid>
  
        {/* STATUS */}
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            size="small"
            select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </TextField>
        </Grid>
  
        {/* FROM DATE */}
        <Grid item xs={12} md={1.5}>
          <TextField
            fullWidth
            size="small"
            label="From"
            type="date"
            name="from"
            value={filters.from}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
  
        {/* TO DATE */}
        <Grid item xs={12} md={1.5}>
          <TextField
            fullWidth
            size="small"
            label="To"
            type="date"
            name="to"
            value={filters.to}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
  
        {/* RESET */}
        <Grid item xs={12} md={1}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleReset}
            sx={{ height: "40px" }}
          >
            Reset
          </Button>
        </Grid>
  
      </Grid>
  
    );
  
  }