import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rentals: [],
  loading: false,
};

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    setRentals: (state, action) => {
      state.rentals = action.payload;
    },
  },
});

export const { setRentals } = rentalSlice.actions;
export default rentalSlice.reducer;
