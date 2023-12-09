import axios from "axios";

// Load environment variables
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// initialize searching
export const initialize = (body) => {
  return axios.post(`${REACT_APP_BASE_URL}/initialize`, body);
};

// update status
export const updateStatus = (room_id) => {
  return axios.get(`${REACT_APP_BASE_URL}/status/${room_id}`);
};

// get messages
export const getMessages = (room_id) => {
  return axios.get(`${REACT_APP_BASE_URL}/messages/${room_id}`);
};

// send message
export const sendMessage = (body) => {
  return axios.post(`${REACT_APP_BASE_URL}/send/message`, body);
};

// disconnect
export const disconnect = (room_id) => {
  return axios.post(`${REACT_APP_BASE_URL}/disconnect/${room_id}`);
};

// room info
export const roomInfo = (room_id) => {
  return axios.get(`${REACT_APP_BASE_URL}/room-info/${room_id}`);
};
