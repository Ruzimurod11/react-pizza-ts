import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params, thunkApi) => {
	const { sortBy, order, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://6688719f0ea28ca88b85405a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
	);

	if (data.length === 0) {
		return thunkApi.rejectWithValue("Пиццы пустые");
	}
	return thunkApi.fulfillWithValue(data);
});

const initialState = {
	items: [],
	status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = "loading";
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				console.log(action, "fullfilled");
				state.items = action.payload;
				state.status = "success";
				console.log(state);
			})
			.addCase(fetchPizzas.rejected, (state, action) => {
				console.log(action, "rejected");
				state.status = "error";
				state.items = [];
			});
	},
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
