import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
	name: "shop",
	initialState: {
		value: {
			categorySelected: "",
			productIdSelected: null,
		},
	},
	reducers: {
		setCategorySelected: (state, action) => {
			state.value.categorySelected = action.payload;
		},
		setProductIdSelected: (state, { payload }) => {
			state.value.productIdSelected = payload;
		},
	},
});

export const { setCategorySelected, setProductIdSelected } = shopSlice.actions;
export default shopSlice.reducer;
