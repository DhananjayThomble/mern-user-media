import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadVideo = createAsyncThunk('video/uploadVideo', async (videoData, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        formData.append('video', videoData.file);

        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/videos/upload`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUserVideos = createAsyncThunk('video/fetchUserVideos', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/videos/my-videos`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videos: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadVideo.fulfilled, (state, { payload }) => {
                state.videos.push(payload);
                state.loading = false;
            })
            .addCase(uploadVideo.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            })
            .addCase(fetchUserVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserVideos.fulfilled, (state, { payload }) => {
                state.videos = payload;
                state.loading = false;
            })
            .addCase(fetchUserVideos.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    },
});

export default videoSlice.reducer;
