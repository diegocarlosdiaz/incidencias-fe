import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import ApiService from './ApiService';

const url = '/estados'

export const getEstados = createAsyncThunk(
  'estados/get',
  async (params) => { 
    return await ApiService.get(url, params);
  }
);

export const getEstadosCSV = createAsyncThunk(
  'estados/export',
  async (params) => { 
    return await ApiService.getCsv(url +"/export", params);
  }
);

const EstadosSlice = createSlice({
  name: 'estados',
  initialState: {
    entities: [],
    headers: null,
    totalItems: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getEstados), (state) => {
        state.entities = [];
        state.isLoading = true;
        state.error = null;
        state.headers = null;
        state.totalItems = null;
      })
      .addMatcher(isFulfilled(getEstados), (state, action) => {
        state.isLoading = false;
        state.entities = action.payload?.data;
        state.headers = action.payload?.length;
        state.totalItems = action.payload?.totalItems;
        state.error = null;
      })
      .addMatcher(isRejected(getEstados), (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.entities = [];
      });
  },
});

export default EstadosSlice.reducer;