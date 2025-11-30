'use client';

import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, FunnelChart, Funnel, LabelList
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { ChartCard } from './ChartCard';

const RechartsTooltip = ({ active, payload, label, formatter }: any) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        padding: '10px',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.primary,
      }}>
        <p style={{ fontWeight: 'bold' }}>{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {formatter ? formatter(pld.value, pld.name) : `${pld.name}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueLineChart = ({ data, category }: { data: any[], category: string }) => {
  const theme = useTheme();
  return (
    <ChartCard title={`Revenue Trend (${category})`} sx={{ gridColumn: { lg: 'span 2' } }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} tickFormatter={(value) => `$${(value / 1000)}k`} />
          <Tooltip content={<RechartsTooltip formatter={(value: number) => `$${value.toFixed(2)}`} />} />
          <Legend />
          <Line type="monotone" dataKey={category === 'all' ? 'sales' : 'value'} name="Revenue" stroke={theme.palette.primary.main} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const ConversionFunnelChart = ({ data }: { data: any[] }) => {
  const theme = useTheme();
  return (
    <ChartCard title="Sales Conversion Funnel">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart margin={{ top: 20, right: 60, bottom: 5, left: 60 }}>
          <Tooltip content={<RechartsTooltip />} />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
          >
            <LabelList position="right" fill={theme.palette.text.primary} stroke="none" dataKey="stage" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};


export const ProfitBarChart = ({ data, category }: { data: any[], category: string }) => {
  const theme = useTheme();
  return (
    <ChartCard title={`Cost Breakdown`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} horizontal={false} />
          <XAxis type="number" stroke={theme.palette.text.secondary} tickFormatter={(value) => `$${(value / 1000)}k`} />
          <YAxis type="category" dataKey="category" stroke={theme.palette.text.secondary} width={80} />
          <Tooltip content={<RechartsTooltip formatter={(value: number) => `$${value.toFixed(2)}`} />} />
          <Legend />
          <Bar dataKey="current" name="Current Cost" fill={theme.palette.secondary.main} />
          <Bar dataKey="previous" name="Previous Cost" fill={theme.palette.info.light} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const UserAreaChart = ({ data, category }: { data: any[], category: string }) => {
  const theme = useTheme();
  return (
    <ChartCard title={`Traffic Sources`} sx={{ gridColumn: { lg: 'span 2' } }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip content={<RechartsTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="organic" stackId="1" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
          <Area type="monotone" dataKey="paid" stackId="1" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.6} />
          <Area type="monotone" dataKey="social" stackId="1" stroke={theme.palette.success.main} fill={theme.palette.success.main} fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const GeoPieChart = ({ data }: { data: any[] }) => {
  const theme = useTheme();
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ChartCard title="Category Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" labelLine={false} label={renderCustomizedLabel}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<RechartsTooltip />} />
          <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const PerformanceRadarChart = ({ data }: { data: any[] }) => {
  const theme = useTheme();
  return (
    <ChartCard title="Core Performance Metrics">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={theme.palette.divider} />
          <PolarAngleAxis dataKey="metric" stroke={theme.palette.text.secondary} />
          <Tooltip content={<RechartsTooltip />} />
          <Radar name="Sales" dataKey="sales" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
          <Radar name="Marketing" dataKey="marketing" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const CostScatterChart = ({ data, category }: { data: any[], category: string }) => {
  const theme = useTheme();
  return (
    <ChartCard title={`Weekly Trends (${category})`}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            type="number"
            dataKey="x"
            name="X Value"
            stroke={theme.palette.text.secondary}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y Value"
            stroke={theme.palette.text.secondary}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={<RechartsTooltip />}
          />
          <Scatter name="Weekly Trend" data={data} fill={theme.palette.primary.main} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};