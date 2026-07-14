import { Box, Stack, Typography } from "@mui/material";

/**
 * Shared header for dashboard chart cards.
 *
 * Backward compatible: <ChartTitle>My Chart</ChartTitle> renders exactly
 * as before. New optional props (icon, subtitle, action) let individual
 * chart cards opt into richer headers without introducing a new component.
 */
export default function ChartTitle({ children, icon, subtitle, action }) {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 2 }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {/* Accent bar — subtle industrial/BI-style anchor */}
        <Box
          sx={{
            width: 4,
            height: subtitle ? 32 : 22,
            borderRadius: 1,
            bgcolor: "primary.main",
            flexShrink: 0,
          }}
        />

        {icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "primary.main",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.05rem",
              lineHeight: 1.3,
              letterSpacing: 0.1,
              color: "text.primary",
            }}
          >
            {children}
          </Typography>

          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                mt: 0.25,
                letterSpacing: 0.2,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Stack>
  );
}