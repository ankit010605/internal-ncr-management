import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

export default function SectionCard({ title, icon, children }) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >

      <CardContent sx={{ p: 3 }}>

        <Box display="flex" alignItems="center" gap={1.25} mb={2}>

          {icon && (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                bgcolor: "rgba(217, 119, 6, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {icon}
            </Box>
          )}

          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1F2937" }}>
            {title}
          </Typography>

        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {children}

      </CardContent>

    </Card>
  );
}