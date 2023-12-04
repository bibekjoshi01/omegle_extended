import { createSlice } from '@reduxjs/toolkit';
import { createStarter, disconnectUser, getUserMessages, sendMessages, updateUserStatus } from './thunk';

const initialState = {
	roomId: null,
	status: null,
	loading: false,
	isSearching: false,
	disconnecting: false,
	isNext: false,
	sending: false,
	messages: [],
	loadingMessages: false,
};

export const starterSlice = createSlice({
	name: 'starter',
	initialState,
	reducers: {
		setRoomId: (state, action) => {
			state.roomId = action.payload;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setIsSearching: (state, action) => {
			state.isSearching = action.payload;
		},
		setIsNext: (state, action) => {
			state.isNext = action.payload;
		},
	},
	extraReducers: (builder) => {
		// create starter
		builder.addCase(createStarter.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createStarter.fulfilled, (state) => {
			state.loading = true;
		});
		builder.addCase(createStarter.rejected, (state) => {
			state.loading = false;
		});

		// update user status
		builder.addCase(updateUserStatus.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserStatus.fulfilled, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserStatus.rejected, (state) => {
			state.loading = false;
		});

		// send messages
		builder.addCase(sendMessages.pending, (state) => {
			state.sending = true;
		});
		builder.addCase(sendMessages.fulfilled, (state, { payload }) => {
			state.sending = false;
		});
		builder.addCase(sendMessages.rejected, (state) => {
			state.sending = false;
		});

		// get messages
		builder.addCase(getUserMessages.pending, (state)=>{
			state.loadingMessages = true
		})
		builder.addCase(getUserMessages.fulfilled, (state, {payload})=>{
			state.messages = payload
			state.loadingMessages = false
		})
		builder.addCase(getUserMessages.rejected, (state)=>{
			state.loadingMessages = false
		})

		// disconnect user
		builder.addCase(disconnectUser.pending, (state) => {
			state.disconnecting = true;
		});

		builder.addCase(disconnectUser.fulfilled, (state) => {
			state.disconnecting = false;
		});

		builder.addCase(disconnectUser.rejected, (state) => {
			state.disconnecting = false;
		});
	},
});

export const { setRoomId, setStatus, setIsSearching, setIsNext } = starterSlice.actions;
export default starterSlice.reducer;
