import { createAsyncThunk } from '@reduxjs/toolkit';
import { disconnect, getMessages, initialize, roomInfo, sendMessage, updateStatus } from './api';

export const createStarter = createAsyncThunk('starter', async (values) => {
	try {
		const response = await initialize(values);
		return { payload: response.data };
	} catch (err) {
		return err;
	}
});

// update status
export const updateUserStatus = createAsyncThunk('status', async (room_id) => {
	try {
		const response = await updateStatus(room_id);
		return { payload: response.data };
	} catch (err) {
		return err;
	}
});

// get messages
export const getUserMessages = createAsyncThunk('messages', async (room_id) => {
	try {
		const response = await getMessages(room_id);
		return { payload: response.data };
	} catch (err) {
		return err;
	}
});

// post messages
export const sendMessages = createAsyncThunk('sendMessages', async (values) => {
	try {
		const response = await sendMessage(values);
		return { payload: response.data };
	} catch (err) {
		return err;
	}
});

// disconnect user
export const disconnectUser = createAsyncThunk('disconnect', async (room_id) => {
	try {
		const response = await disconnect(room_id);
		return { payload: response.data };
	} catch (err) {
		return err;
	}
});

// get room info
export const getRoomInfo = createAsyncThunk('room info', async (room_id) => {
	try {
		const {data} = await roomInfo(room_id)
		return data
	} catch (err) {
		return err;
	}
});
