'use client';

import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, TextField, Typography, Paper, CircularProgress, Alert, Link as MuiLink, IconButton
} from '@mui/material';
import { LogIn, UserPlus, Sun, Moon } from 'lucide-react';
import { mockLogin } from '@/redux/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ThemeContext } from '@/theme/ThemeProvider';

export function AuthForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    const result = await dispatch(mockLogin(email, password));

    if (!result.success) {
      setFormError(result.error || 'Authentication Failed. Try again.');
    }
  };

  const Icon = isLogin ? LogIn : UserPlus;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 4,
      }}
    >
      <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
        <IconButton onClick={toggleTheme}>
          {mode === 'dark' ? <Sun /> : <Moon />}
        </IconButton>
      </Box>
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, md: 5 },
          width: '100%',
          maxWidth: '420px',
          borderRadius: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            visualise.io
          </Typography>
        </Box>
        <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center', fontWeight: '600' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </Typography>

        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || formError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@mail.com"
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Icon size={20} />}
            sx={{ mt: 2, py: 1.5 }}
          >
            {loading ? 'Signing In...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Button>
        </Box>

        <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <MuiLink component="button" variant="body1" onClick={() => setIsLogin(!isLogin)} sx={{ fontWeight: 'medium' }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
}