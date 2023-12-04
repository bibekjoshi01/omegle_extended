import axios from "axios"


// initialize searching
export const initialize = (body) =>{
  return axios.post("http://localhost:8000/api/chat/initialize", body)
}


// update status
export const updateStatus = (room_id) =>{
  return axios.get(`http://localhost:8000/api/chat/status/${room_id}`)
}

// get messages
export const getMessages = (room_id) =>{
  return axios.get(`http://localhost:8000/api/chat/messages/${room_id}`)
}

// send message
export const sendMessage = (body) =>{
  return axios.post(`http://localhost:8000/api/chat/send/message`, body)
}


// disconnect 
export const disconnect = (room_id) =>{
  return axios.post(`http://localhost:8000/api/chat/disconnect/${room_id}`)
}

// room info
export const roomInfo = (room_id) =>{
  return axios.get(`http://localhost:8000/api/chat/room-info/${room_id}`)
}