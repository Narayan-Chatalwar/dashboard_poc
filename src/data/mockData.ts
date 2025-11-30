import { CategoryFilter } from '@/redux/dashboardSlice';

// Revenue data for line chart
export const revenueData = [
  { month: 'Jan', sales: 4000, marketing: 2400, operations: 2400, finance: 1800, hr: 1200 },
  { month: 'Feb', sales: 3000, marketing: 1398, operations: 2210, finance: 2100, hr: 1400 },
  { month: 'Mar', sales: 2000, marketing: 9800, operations: 2290, finance: 2400, hr: 1100 },
  { month: 'Apr', sales: 2780, marketing: 3908, operations: 2000, finance: 2700, hr: 1600 },
  { month: 'May', sales: 1890, marketing: 4800, operations: 2181, finance: 2900, hr: 1300 },
  { month: 'Jun', sales: 2390, marketing: 3800, operations: 2500, finance: 3100, hr: 1500 },
  { month: 'Jul', sales: 3490, marketing: 4300, operations: 2100, finance: 3300, hr: 1700 },
  { month: 'Aug', sales: 4200, marketing: 4100, operations: 2800, finance: 3000, hr: 1400 },
  { month: 'Sep', sales: 5100, marketing: 4800, operations: 3200, finance: 2800, hr: 1600 },
  { month: 'Oct', sales: 4800, marketing: 5200, operations: 3400, finance: 3200, hr: 1800 },
  { month: 'Nov', sales: 5500, marketing: 5800, operations: 3100, finance: 3500, hr: 1900 },
  { month: 'Dec', sales: 6200, marketing: 6200, operations: 3600, finance: 3800, hr: 2000 },
];

// Category distribution for pie chart
export const categoryDistribution = [
  { name: 'Sales', value: 35, color: '#6366f1' },
  { name: 'Marketing', value: 25, color: '#ec4899' },
  { name: 'Operations', value: 20, color: '#10b981' },
  { name: 'Finance', value: 12, color: '#f59e0b' },
  { name: 'HR', value: 8, color: '#3b82f6' },
];

// Cost breakdown for bar chart
export const costBreakdown = [
  { category: 'Infrastructure', current: 12500, previous: 11200, budget: 13000 },
  { category: 'Personnel', current: 45000, previous: 42000, budget: 48000 },
  { category: 'Marketing', current: 18000, previous: 15000, budget: 20000 },
  { category: 'Operations', current: 8500, previous: 8000, budget: 9000 },
  { category: 'R&D', current: 22000, previous: 19000, budget: 25000 },
  { category: 'Misc', current: 4500, previous: 4200, budget: 5000 },
];

// Traffic sources for area chart
export const trafficSources = [
  { date: '01', organic: 4000, paid: 2400, social: 1800, referral: 1200 },
  { date: '05', organic: 3000, paid: 1398, social: 2100, referral: 1400 },
  { date: '10', organic: 2000, paid: 9800, social: 2400, referral: 1100 },
  { date: '15', organic: 2780, paid: 3908, social: 2700, referral: 1600 },
  { date: '20', organic: 1890, paid: 4800, social: 2900, referral: 1300 },
  { date: '25', organic: 2390, paid: 3800, social: 3100, referral: 1500 },
  { date: '30', organic: 3490, paid: 4300, social: 3300, referral: 1700 },
];

// Performance metrics for radar chart
export const performanceMetrics = [
  { metric: 'Efficiency', sales: 85, marketing: 78, operations: 90, finance: 88, hr: 75 },
  { metric: 'Growth', sales: 92, marketing: 88, operations: 72, finance: 65, hr: 70 },
  { metric: 'Retention', sales: 78, marketing: 82, operations: 85, finance: 90, hr: 88 },
  { metric: 'Satisfaction', sales: 88, marketing: 75, operations: 80, finance: 85, hr: 92 },
  { metric: 'Innovation', sales: 70, marketing: 85, operations: 75, finance: 60, hr: 65 },
  { metric: 'Quality', sales: 82, marketing: 80, operations: 95, finance: 92, hr: 85 },
];

// Weekly trends for scatter plot
export const weeklyTrends = [
  { x: 100, y: 200, z: 200, name: 'Week 1' },
  { x: 120, y: 100, z: 260, name: 'Week 2' },
  { x: 170, y: 300, z: 400, name: 'Week 3' },
  { x: 140, y: 250, z: 280, name: 'Week 4' },
  { x: 150, y: 400, z: 500, name: 'Week 5' },
  { x: 110, y: 280, z: 200, name: 'Week 6' },
];

// Funnel data for conversion
export const funnelData = [
  { stage: 'Visitors', value: 10000, fill: '#6366f1' },
  { stage: 'Leads', value: 6500, fill: '#818cf8' },
  { stage: 'Qualified', value: 4200, fill: '#a5b4fc' },
  { stage: 'Proposals', value: 2800, fill: '#c7d2fe' },
  { stage: 'Closed', value: 1800, fill: '#e0e7ff' },
];

// Stats for dashboard cards
export const dashboardStats = {
  currentCost: 124580,
  estimatedCost: 145000,
  totalRevenue: 892450,
  activeUsers: 12847,
  conversionRate: 3.24,
  avgOrderValue: 156.78,
};

// Filter tabs for dashboard
export const TABS = [
  { id: 'all', label: 'All Analytics' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'finance', label: 'Finance' },
];

// Filter data by category
export const getFilteredData = (category: CategoryFilter) => {
  if (category === 'all') {
    return {
      revenueData,
      categoryDistribution,
      costBreakdown,
      trafficSources,
      performanceMetrics,
      weeklyTrends,
      funnelData,
    };
  }

  // Filter revenue data to show only selected category
  const filteredRevenue = revenueData.map(item => ({
    month: item.month,
    value: item[category as keyof typeof item],
  }));

  // Filter performance metrics
  const filteredPerformance = performanceMetrics.map(item => ({
    metric: item.metric,
    [category]: item[category as keyof typeof item],
  }));

  return {
    revenueData: filteredRevenue,
    categoryDistribution: categoryDistribution.filter(
      item => item.name.toLowerCase() === category
    ),
    costBreakdown,
    trafficSources,
    performanceMetrics: filteredPerformance,
    weeklyTrends,
    funnelData,
  };
};
