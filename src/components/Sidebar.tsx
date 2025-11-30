'use client';

import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Avatar, Tooltip } from '@mui/material';
import { Home, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { logout } from '@/redux/authSlice';
import { RootState } from '@/redux/store';
import { ThemeContext } from '@/theme/ThemeProvider';

export function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [isClient, setIsClient] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      sx={{
        width: { xs: 60, md: 240 },
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, display: { xs: 'none', md: 'block' } }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Visualise.io
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Analytics Suite
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ display: { xs: 'none', md: 'block' } }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" sx={{ display: { xs: 'none', md: 'block' } }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {isClient && (
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'space-between' },
              p: 1,
              borderRadius: 3,
              bgcolor: 'action.hover',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>{user?.avatar}</Avatar>
              <Box sx={{ ml: 1.5, display: { xs: 'none', md: 'block' } }}>
                <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>{user?.name}</Typography>
                <Typography variant="caption" noWrap color="text.secondary">{user?.email}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                <IconButton onClick={toggleTheme} size="small">
                    {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout} size="small" sx={{ ml: 0.5, color: 'error.main' }}>
                  <LogOut size={18} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}