'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import { RootState } from '@/redux/store';
import { AuthForm } from '@/components/AuthForm';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading visualise.io ...</Typography>
      </Box>
    );
  }

  return <>{isAuthenticated ? <Dashboard /> : <AuthForm />}</>;
}
