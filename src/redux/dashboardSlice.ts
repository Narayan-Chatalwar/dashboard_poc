import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoryFilter = 'all' | 'sales' | 'marketing' | 'operations' | 'finance' | 'hr';
export type TimeRange = '7d' | '30d' | '90d' | '1y';

interface DashboardState {
  categoryFilter: CategoryFilter;
  timeRange: TimeRange;
  loading: boolean;
}

const initialState: DashboardState = {
  categoryFilter: 'all',
  timeRange: '30d',
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<CategoryFilter>) => {
      state.categoryFilter = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.timeRange = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategoryFilter, setTimeRange, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
