import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api, { apiCallStatus } from '../constant/api';

// Define a type for the slice state
interface itemState {
  id: string,
  name: string,
  price: number,
  image: string,
  description: string
}

interface OrderState {
  items: itemState[];
  totalQuantity: number;
  placeOrderStatus: number;
}

// Define the initial state using that type
const initialState: OrderState = {
  items: [],
  totalQuantity: 0,
  placeOrderStatus: apiCallStatus.STANDBY,
};

//thunk function for place order api call
export const postAuth = createAsyncThunk('auth/login', async (req: OrderState) => {
  try {
    const response = await fetch(`${api.getBaseUrl()}order`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<{ item: itemState }>) => {
      state.items.push(payload);
      state.totalQuantity += 1;
    },
    removeItem: (state) => {
      state.totalQuantity -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAuth.pending, (state) => {
      state.placeOrderStatus = apiCallStatus.PENDING;
    });
    builder.addCase(postAuth.fulfilled, (state, action) => {
      state.placeOrderStatus = apiCallStatus.SUCCESS;
    });
    builder.addCase(postAuth.rejected, (state) => {
      state.placeOrderStatus = apiCallStatus.FAILED;
    });
  },
});

export const { addItem, removeItem } = orderSlice.actions;

export default orderSlice.reducer;
