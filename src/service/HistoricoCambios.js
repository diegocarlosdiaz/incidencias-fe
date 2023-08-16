import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import ApiService from './ApiService';

const url = '/historialDeCambios'

export const getHistoricoCambios = createAsyncThunk(
    'historialDeCambios/get',
    async (params) => {
        return await ApiService.get(url, params);
    }
);

const HistoricoCambiosSlice = createSlice({
    name:'historialDeCambios',
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
          .addMatcher(isPending(getHistoricoCambios), (state) => {
            state.entities = [];
            state.isLoading = true;
            state.error = null;
            state.headers = null;
            state.totalItems = null;
          })
          .addMatcher(isFulfilled(getHistoricoCambios), (state, action) => {
            state.isLoading = false;
            state.entities = action.payload?.data;
            state.headers = action.payload?.length;
            state.totalItems = action.payload?.totalItems;
            state.error = null;
          })
          .addMatcher(isRejected(getHistoricoCambios), (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.entities = [];
          });
      },
})

export default HistoricoCambiosSlice.reducer