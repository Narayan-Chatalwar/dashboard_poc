'use client';

import { Grid, Paper, Typography, Box } from '@mui/material';
import { TrendingUp, Clock, CheckCircle, Home, ArrowUp, ArrowDown } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';
import { AnimatedCounter } from './AnimatedCounter';

const metricCards = [
  {
    title: 'Current Cost (MTD)',
    value: dashboardStats.currentCost,
    icon: TrendingUp,
    trend: { text: 'Up 4.2% from last week', Icon: ArrowUp, color: 'error.main' },
    prefix: '$',
  },
  {
    title: 'Monthly Estimate',
    value: dashboardStats.estimatedCost,
    icon: Clock,
    trend: { text: 'Projected 30% over target', Icon: ArrowUp, color: 'error.main' },
    prefix: '$',
  },
  {
    title: 'Monthly Target',
    value: dashboardStats.totalRevenue, // Using totalRevenue as a proxy for a target
    icon: CheckCircle,
    trend: { text: 'Baseline Budget', Icon: null, color: 'text.secondary' },
    prefix: '$',
  },
  {
    title: 'Active Users',
    value: dashboardStats.activeUsers,
    icon: Home,
    trend: { text: '3.9% more than last month', Icon: ArrowDown, color: 'success.main' },
    prefix: '',
  },
];

export function MetricBlock() {
  return (
    <Grid container spacing={3}>
      {metricCards.map((card) => (
          <Paper sx={{ p: 2.5, borderRadius: 4 }} key={card.title}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" color="text.secondary">{card.title}</Typography>
              <card.icon size={24} color="primary" />
            </Box>
            <AnimatedCounter value={card.value} prefix={card.prefix} decimals={card.prefix === '$' ? 2 : 0} formatAsCurrency={card.prefix === '$'} variant="h4" component="p" sx={{ fontWeight: 'bold' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', color: card.trend.color, mt: 1 }}>
              {card.trend.Icon && <card.trend.Icon size={16} style={{ marginRight: 4 }} />}
              <Typography variant="caption">{card.trend.text}</Typography>
            </Box>
          </Paper>
      ))}
    </Grid>
  );
}