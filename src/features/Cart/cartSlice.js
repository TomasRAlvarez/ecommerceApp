import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		value: {
			items: [],
			total: null,
		},
	},
	reducers: {
		addToCart: (state, { payload }) => {
			const productRepeated = state.value.items.find((item) => item.id === payload.id);
			if (productRepeated) {
				const updateItems = state.value.items.map((item) => {
					if (item.id === payload.id) {
						item.quantity += payload.quantity;
						return item;
					}
					return item;
				});

				const total = updateItems.reduce((acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0);

				state.value = {
					...state.value,
					items: updateItems,
					total,
				};
			} else {
				state.value.items.push(payload);
				const total = state.value.items.reduce((acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0);
				state.value = {
					...state.value,
					total,
				};
			}
		},
		removeFromCart: (state, { payload }) => {
			const updateItems = state.value.items.filter((item) => item.id !== payload.id);
			const total = updateItems.reduce((acc, currentItem) => (acc += currentItem.price * currentItem.quantity), 0);

			state.value = {
				...state.value,
				items: updateItems,
				total,
			};
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
