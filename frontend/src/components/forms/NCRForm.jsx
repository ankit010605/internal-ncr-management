import { useEffect, useRef, useState } from "react";
import api from "../../api/api";

import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  LinearProgress,
  IconButton,
  CircularProgress,
} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import MainLayout from "../layout/MainLayout";
import SectionCard from "../common/SectionCard";

const PRIMARY = "#D97706";

const getInitialForm = () => ({
  project_name: "",
  drawing_number: "",
  plant: "",
  bay: "",
  stage: "",
  contractor: "",

  production_incharge: "",
  quality_incharge: "",

  initiator_name: "",
  responsible_person: "",
  responsible_email: "",

  issue_date: "",
  target_closing_date: "",

  ncr_description: "",
  root_cause_analysis: "",
  corrective_preventive_action: "",

  images: [],
});

export default function NCRForm() {

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [plantMaster, setPlantMaster] = useState([]);
  const [plants, setPlants] = useState([]);
  const [bays, setBays] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [form, setForm] = useState(getInitialForm());

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
        const res = await api.get("/master");
      setPlantMaster(res.data.data);

      const uniquePlants = [
        ...new Set(res.data.data.map((p) => p.plant_name)),
      ];

      setPlants(uniquePlants);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "plant") {

      const filtered = plantMaster.filter(
        (x) => x.plant_name === value
      );

      setBays(filtered);
      setSelectedPlant(filtered[0]);

      setForm((prev) => ({
        ...prev,
        plant: value,
        bay: "",
        production_incharge:
          filtered[0]?.production_incharge_name || "",
        quality_incharge:
          filtered[0]?.quality_incharge_name || "",
      }));

      return;
    }

    if (name === "bay") {

      const selected = plantMaster.find(
        (x) =>
          x.plant_name === form.plant &&
          x.bay_name === value
      );

      setForm((prev) => ({
        ...prev,
        bay: value,
        production_incharge:
          selected?.production_incharge_name || "",
        quality_incharge:
          selected?.quality_incharge_name || "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- IMAGE HANDLING ----------------
  const handleFiles = (fileList) => {

    const files = Array.from(fileList || []);

    setForm((prev) => {

        const existing = [...prev.images];

        files.forEach((file) => {

            const alreadyExists = existing.some(
                (img) =>
                    img.name === file.name &&
                    img.size === file.size
            );

            if (!alreadyExists) {
                existing.push(file);
            }

        });

        return {
            ...prev,
            images: existing,
        };

    });

  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const resetForm = () => {
    setForm(getInitialForm());
    setBays([]);
    setSelectedPlant(null);
  };

  const submitNCR = async () => {

    try {
  
      setLoading(true);
      setUploadProgress(0);
  
      const formData = new FormData();
  
      Object.keys(form).forEach((key) => {
  
        if (key !== "images") {
          formData.append(key, form[key]);
        }
  
      });
  
      form.images.forEach((image) => {
        formData.append("attachments", image);
      });
  
      const response = await api.post(
        "/ncr",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percent);
          },
        }
      );
  
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });
  
      console.log(response.data);
  
    } catch (error) {
  
      console.log(error);
  
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to create NCR.",
        severity: "error",
      });
  
    } finally {
  
      setLoading(false);
  
    }
  
  };

  // ---------------- SUBMIT ----------------

  return (
    <MainLayout>

      <Box mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1F2937" }}>
          Internal NCR Creation
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
          Fill in the details below to raise a new Non-Conformance Report
        </Typography>
      </Box>

      {/* BASIC INFO */}
      <SectionCard title="Basic Information" icon={<InfoOutlinedIcon sx={{ color: PRIMARY }} />}>

        <Grid container spacing={2.5}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Project Name"
              name="project_name"
              placeholder="e.g. Bhilai Steel Plant Expansion"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Drawing Number"
              name="drawing_number"
              placeholder="e.g. DWG-2026-0451"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              required
              label="Plant"
              name="plant"
              value={form.plant}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Plant
              </MenuItem>

              {plants.map((p, i) => (
                <MenuItem key={i} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Bay"
              name="bay"
              value={form.bay}
              onChange={handleChange}
              disabled={!form.plant}
            >
              <MenuItem value="" disabled>
                {form.plant ? "Select Bay" : "Select a plant first"}
              </MenuItem>

              {bays.map((b, i) => (
                <MenuItem key={i} value={b.bay_name}>
                  {b.bay_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Stage"
              name="stage"
              placeholder="e.g. Fit-up / Welding / Final"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contractor"
              name="contractor"
              placeholder="Contractor name"
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </SectionCard>

      {/* RESPONSIBILITY */}
      <SectionCard title="Responsibility" icon={<AssignmentIndOutlinedIcon sx={{ color: PRIMARY }} />}>

        <Grid container spacing={2.5}>

          {/* Production Incharge */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Production Incharge"
              value={form.production_incharge}
              disabled
              helperText="Auto-filled based on selected plant / bay"
            />
          </Grid>

          {/* Quality Incharge */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quality Incharge"
              value={form.quality_incharge}
              disabled
              helperText="Auto-filled based on selected plant / bay"
            />
          </Grid>

          {/* Initiator Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Initiator Name"
              name="initiator_name"
              value={form.initiator_name}
              placeholder="Your name"
              onChange={handleChange}
            />
          </Grid>

          {/* Responsible Person */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Responsible Person"
              name="responsible_person"
              value={form.responsible_person}
              placeholder="Person responsible for closure"
              onChange={handleChange}
            />
          </Grid>

          {/* Responsible Email */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="email"
              label="Responsible Email"
              name="responsible_email"
              value={form.responsible_email}
              placeholder="name@jspl.com"
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </SectionCard>

      {/* DATES */}
      <SectionCard title="Dates" icon={<EventOutlinedIcon sx={{ color: PRIMARY }} />}>

        <Grid container spacing={2.5}>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              fullWidth
              label="Issue Date"
              name="issue_date"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              fullWidth
              label="Target Closing Date"
              name="target_closing_date"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </SectionCard>

      {/* NCR DETAILS */}
      <SectionCard title="NCR Details" icon={<DescriptionOutlinedIcon sx={{ color: PRIMARY }} />}>

        <Grid container spacing={2.5}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={4}
              label="NCR Description"
              name="ncr_description"
              placeholder="Describe the non-conformance in detail"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Root Cause Analysis"
              name="root_cause_analysis"
              placeholder="What caused this non-conformance?"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Corrective & Preventive Action"
              name="corrective_preventive_action"
              placeholder="Actions taken or planned"
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </SectionCard>

      {/* IMAGES */}
      <SectionCard title="Attachments" icon={<ImageOutlinedIcon sx={{ color: PRIMARY }} />}>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <Box
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed",
            borderColor: isDragging ? PRIMARY : "#D1D5DB",
            borderRadius: "12px",
            bgcolor: isDragging ? "rgba(217, 119, 6, 0.05)" : "#FAFAFA",
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: PRIMARY,
              bgcolor: "rgba(217, 119, 6, 0.04)",
            },
          }}
        >
          <CloudUploadOutlinedIcon sx={{ fontSize: 40, color: PRIMARY, mb: 1 }} />

          <Typography variant="body1" sx={{ fontWeight: 600, color: "#1F2937" }}>
            Drag & drop images here, or click to browse
          </Typography>

          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            PNG, JPG — multiple files supported
          </Typography>
        </Box>

        {form.images.length > 0 && (

          <Grid container spacing={2} mt={0.5}>

            {form.images.map((img, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={img.name}
                    style={{
                      width: "100%",
                      height: 110,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => removeImage(i)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0,0,0,0.55)",
                      color: "#FFFFFF",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>

                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      display: "block",
                      px: 1,
                      py: 0.5,
                      color: "#6B7280",
                    }}
                  >
                    {img.name}
                  </Typography>
                </Box>
              </Grid>
            ))}

          </Grid>

        )}

      </SectionCard>

      {loading && (
        <Box mt={1} mb={1}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 6,
              borderRadius: 3,
              "& .MuiLinearProgress-bar": { bgcolor: PRIMARY },
            }}
          />
          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      )}

      {/* SUBMIT */}
      <Box display="flex" justifyContent="flex-end" gap={1.5} mt={2}>

        <Button
          variant="outlined"
          size="large"
          onClick={resetForm}
          disabled={loading}
          sx={{
            borderRadius: "8px",
            borderColor: "#D1D5DB",
            color: "#4B5563",
            textTransform: "none",
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={submitNCR}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{
            borderRadius: "8px",
            bgcolor: PRIMARY,
            textTransform: "none",
            px: 4,
            "&:hover": { bgcolor: "#B45F04" },
          }}
        >
          {loading ? "Submitting..." : "Submit NCR"}
        </Button>

      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </MainLayout>
  );
}