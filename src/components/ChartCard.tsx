'use client';

import { Paper, Typography, Box, SxProps } from '@mui/material';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  sx?: SxProps;
}

export function ChartCard({ title, children, sx }: ChartCardProps) {
  return (
    <Paper sx={{ p: 2.5, borderRadius: 4, height: 350, display: 'flex', flexDirection: 'column', ...sx }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2, borderBottom: 1, borderColor: 'divider', pb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
}