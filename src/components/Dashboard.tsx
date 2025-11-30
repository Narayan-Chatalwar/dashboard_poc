'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { RootState, AppDispatch } from '@/redux/store';
import { setCategoryFilter, CategoryFilter } from '@/redux/dashboardSlice';
import { getFilteredData, TABS } from '@/data/mockData';
import { Sidebar } from './Sidebar';
import { MetricBlock } from './MetricBlock';
import {
  RevenueLineChart,
  ProfitBarChart,
  UserAreaChart,
  GeoPieChart,
  PerformanceRadarChart,
  CostScatterChart,
  ConversionFunnelChart,
} from './index';

const AllAnalyticsTab = ({ data, category }: { data: any; category: string }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
    <RevenueLineChart data={data.revenueData} category={category} />
    <ProfitBarChart data={data.costBreakdown} category={category} />
    <UserAreaChart data={data.trafficSources} category={category} />
    <GeoPieChart data={data.categoryDistribution} />
    <PerformanceRadarChart data={data.performanceMetrics} />
    <CostScatterChart data={data.weeklyTrends} category={category} />
  </Box>
);

const SalesTab = ({ data, category }: { data: any; category: string }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
    <RevenueLineChart data={data.revenueData} category={category} />
    <ConversionFunnelChart data={data.funnelData} />
    <GeoPieChart data={data.categoryDistribution} />
  </Box>
);

const MarketingTab = ({ data, category }: { data: any; category: string }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
    <UserAreaChart data={data.trafficSources} category={category} />
    <CostScatterChart data={data.weeklyTrends} category={category} />
  </Box>
);

const FinanceTab = ({ data, category }: { data: any; category: string }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
    <RevenueLineChart data={data.revenueData} category={category} />
    <ProfitBarChart data={data.costBreakdown} category={category} />
  </Box>
);

const renderTabContent = (category: CategoryFilter, data: any) => {
  switch (category) {
    case 'sales': return <SalesTab data={data} category={category} />;
    case 'marketing': return <MarketingTab data={data} category={category} />;
    case 'finance': return <FinanceTab data={data} category={category} />;
    default: return <AllAnalyticsTab data={data} category={category} />;
  }
};

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { categoryFilter } = useSelector((state: RootState) => state.dashboard);

  const handleTabChange = (event: React.SyntheticEvent, newValue: CategoryFilter) => {
    dispatch(setCategoryFilter(newValue));
  };

  const data = getFilteredData(categoryFilter);

  // Ensure user data is loaded before rendering
  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflow: 'auto' }}>
        <header>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Interactive Analytics Dashboard
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            Welcome, {user.name}. Here are your key performance indicators.
          </Typography>
        </header>

        <MetricBlock />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4, mb: 3 }}>
          <Tabs
            value={categoryFilter}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="dashboard filter tabs"
          >
            {TABS.map((tab) => (
              <Tab key={tab.id} label={tab.label} value={tab.id} />
            ))}
          </Tabs>
        </Box>

        {renderTabContent(categoryFilter, data)}
      </Box>
    </Box>
  );
}