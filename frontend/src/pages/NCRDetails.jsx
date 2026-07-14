import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

import {
  Typography,
  Paper,
  Grid,
  TextField,
  Divider,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Skeleton,
  alpha,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { exportNCRDetailPDF } from "../utils/exportNCRDetailPDF";

import MainLayout from "../components/layout/MainLayout";
import SectionCard from "../components/common/SectionCard";

const InfoField = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 500 }}>
      {value || "—"}
    </Typography>
  </Grid>
);

export default function NCRDetails() {
  const { id } = useParams();

  const [ncr, setNcr] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);

  const [closeForm, setCloseForm] = useState({
    closed_by: "",
    root_cause_analysis: "",
    corrective_preventive_action: "",
});

  useEffect(() => {
    loadNCR();
  }, []);

  const loadNCR = async () => {
    try {
      const res = await api.get(`/ncr/${id}`);
      setNcr(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCloseNCR = async () => {

    try {
  
      const res = await api.put(
  
        `/ncr/${id}/close`,
  
        closeForm
  
      );
  
      alert(res.data.message);
  
      setCloseDialogOpen(false);
  
      setCloseForm({
        closed_by: "",
        root_cause_analysis: "",
        corrective_preventive_action: "",
      });
  
      loadNCR();
  
    } catch (err) {
  
      console.log(err);
  
      alert(
        err.response?.data?.message ||
        "Failed to close NCR."
      );
  
    }
  
  };

  if (!ncr)
    return (
      <MainLayout>
        <Skeleton variant="text" width={220} height={48} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: "12px" }} />
      </MainLayout>
    );

  const isOpen = ncr.status === "Open";

  return (
    <MainLayout>

      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >

        <Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
              {ncr.ncr_number}
            </Typography>

            <Chip
              label={ncr.status}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: (theme) =>
                  alpha(isOpen ? theme.palette.error.main : theme.palette.success.main, 0.14),
                color: isOpen ? "error.main" : "success.main",
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {ncr.plant} {ncr.bay ? `• ${ncr.bay}` : ""}
          </Typography>
        </Box>

        <Box display="flex" gap={1.5}>

          <Button
            variant="outlined"
            startIcon={<DownloadOutlinedIcon />}
            onClick={() => exportNCRDetailPDF(ncr)}
            sx={{
              borderRadius: "8px",
              borderColor: "divider",
              color: "text.secondary",
              textTransform: "none",
              "&:hover": {
                borderColor: "text.secondary",
                bgcolor: "action.hover",
              },
            }}
          >
            Download PDF
          </Button>

          {isOpen && (
            <Button
              variant="contained"
              startIcon={<CheckCircleOutlinedIcon />}
              onClick={() => setCloseDialogOpen(true)}
              sx={{
                borderRadius: "8px",
                bgcolor: "success.main",
                textTransform: "none",
                "&:hover": { bgcolor: "success.dark" },
              }}
            >
              Close NCR
            </Button>
          )}

        </Box>

      </Box>

      {/* BASIC INFORMATION */}
      <SectionCard title="Basic Information" icon={<InfoOutlinedIcon sx={{ color: "primary.main" }} />}>
        <Grid container spacing={2.5}>
          <InfoField label="Project" value={ncr.project_name} />
          <InfoField label="Drawing Number" value={ncr.drawing_number} />
          <InfoField label="Plant" value={ncr.plant} />
          <InfoField label="Bay" value={ncr.bay} />
          <InfoField label="Stage" value={ncr.stage} />
          <InfoField label="Contractor" value={ncr.contractor} />
        </Grid>
      </SectionCard>

      {/* RESPONSIBILITY */}
      <SectionCard title="Responsibility" icon={<AssignmentIndOutlinedIcon sx={{ color: "primary.main" }} />}>
        <Grid container spacing={2.5}>
          <InfoField label="Production Incharge" value={ncr.production_incharge_name || ncr.production_incharge} />
          <InfoField label="Quality Incharge" value={ncr.quality_incharge_name || ncr.quality_incharge} />
          <InfoField label="Initiator" value={ncr.initiator_name} />
          <InfoField label="Responsible Person" value={ncr.responsible_person} />
          <InfoField label="Responsible Email" value={ncr.responsible_email} />
        </Grid>
      </SectionCard>

      {/* DATES */}
      <SectionCard title="Dates" icon={<EventOutlinedIcon sx={{ color: "primary.main" }} />}>
        <Grid container spacing={2.5}>
          <InfoField label="Issue Date" value={ncr.issue_date} />
          <InfoField label="Target Closing Date" value={ncr.target_closing_date} />
        </Grid>
      </SectionCard>

      {/* NCR DESCRIPTION / RCA / CAPA */}
      <SectionCard title="NCR Description" icon={<DescriptionOutlinedIcon sx={{ color: "primary.main" }} />}>
        <Typography variant="body1" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
          {ncr.ncr_description || "—"}
        </Typography>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
          Root Cause Analysis
        </Typography>
        <Typography variant="body1" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
          {ncr.root_cause_analysis || "—"}
        </Typography>

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
          Corrective & Preventive Action
        </Typography>
        <Typography variant="body1" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
          {ncr.corrective_preventive_action || "—"}
        </Typography>
      </SectionCard>

      {/* PHOTO GALLERY */}
      <SectionCard title="Photo Gallery" icon={<ImageOutlinedIcon sx={{ color: "primary.main" }} />}>

        {ncr.attachments && ncr.attachments.length > 0 ? (

          <Grid container spacing={2}>
            {ncr.attachments.map((attachment) => (
              <Grid item xs={6} sm={4} md={3} key={attachment.id}>
                <Box
                  onClick={() => setPreviewImage(attachment.image_url)}
                  sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.4)" },
                  }}
                >
                  <img
                    src={attachment.image_url}
                    alt="NCR Attachment"
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

        ) : (

          <Typography color="text.secondary">
            No attachments uploaded.
          </Typography>

        )}

      </SectionCard>

      <Dialog
        open={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        maxWidth="md"
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setPreviewImage(null)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.55)",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {previewImage && (
            <img
              src={previewImage}
              alt="NCR Attachment Preview"
              style={{ width: "100%", display: "block" }}
            />
          )}
        </Box>
      </Dialog>
      <Dialog
  open={closeDialogOpen}
  onClose={() => setCloseDialogOpen(false)}
  maxWidth="sm"
  fullWidth
>

  <Box sx={{ p: 3 }}>

    <Typography
      variant="h6"
      fontWeight={700}
      mb={3}
    >
      Close Internal NCR
    </Typography>

    <TextField
      fullWidth
      label="Closed By"
      margin="normal"
      value={closeForm.closed_by}
      onChange={(e) =>
        setCloseForm({
          ...closeForm,
          closed_by: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      multiline
      rows={4}
      margin="normal"
      label="Root Cause Analysis"
      value={closeForm.root_cause_analysis}
      onChange={(e) =>
        setCloseForm({
          ...closeForm,
          root_cause_analysis: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      multiline
      rows={4}
      margin="normal"
      label="Corrective & Preventive Action"
      value={closeForm.corrective_preventive_action}
      onChange={(e) =>
        setCloseForm({
          ...closeForm,
          corrective_preventive_action:
            e.target.value,
        })
      }
    />

    <Box
      mt={3}
      display="flex"
      justifyContent="flex-end"
      gap={2}
    >

      <Button
        onClick={() =>
          setCloseDialogOpen(false)
        }
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={handleCloseNCR}
      >
        Close NCR
      </Button>

    </Box>

  </Box>

</Dialog>
    </MainLayout>
  );
}