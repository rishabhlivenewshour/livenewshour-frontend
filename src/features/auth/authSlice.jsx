import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: localStorage.getItem('accessToken') || null,
	refreshToken: localStorage.getItem('refreshToken') || null,
	isAuthenticated: !!localStorage.getItem('accessToken'),
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.accessToken = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
			state.error = null;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
	},
	extraReducers: (builder) => {
		// LOGIN
		builder.addCase('auth/login/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('auth/login/fulfilled', (state, action) => {
			state.loading = false;
			state.accessToken = action.payload.access;
			state.refreshToken = action.payload.refresh;
			state.isAuthenticated = true;
		});
		builder.addCase('auth/login/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// REFRESH TOKEN
		builder.addCase('auth/refresh/fulfilled', (state, action) => {
			state.accessToken = action.payload.access;
			state.isAuthenticated = true;
		});
		builder.addCase('auth/refresh/rejected', (state, action) => {
			state.accessToken = null;
			state.isAuthenticated = false;
			state.error = action.payload;
		});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
