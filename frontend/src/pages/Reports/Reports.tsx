import React from "react";
import { Box, Typography } from "@mui/material";

const Reports: React.FC = () => {
  return (
    <Box width="100%" boxSizing="border-box">
      <Typography variant="h4" fontWeight={600} mb={4}>
        Reports
      </Typography>
      {/* Add reports content here */}
    </Box>
  );
};

export default Reports;
