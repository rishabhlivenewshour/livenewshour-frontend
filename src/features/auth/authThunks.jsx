import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../service/apiClient';

// LOGIN
export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const data = await apiClient('/auth/token/', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
			});

			// Save tokens to localStorage
			localStorage.setItem('accessToken', data.access);
			localStorage.setItem('refreshToken', data.refresh);

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// REFRESH ACCESS TOKEN
export const refreshAccessToken = createAsyncThunk(
	'auth/refresh',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const refreshToken = localStorage.getItem('refreshToken');

			if (!refreshToken) {
				return rejectWithValue('No refresh token found');
			}

			const data = await apiClient('/auth/token/refresh/', {
				method: 'POST',
				body: JSON.stringify({ username, password, refresh: refreshToken }),
			});

			localStorage.setItem('accessToken', data.access);

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
