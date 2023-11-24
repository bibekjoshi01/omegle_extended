import axios from "axios"


// initialize searching
export const initialize = (body) =>{
  return axios.post("http://localhost:8000/api/chat/initialize", body)
}


// find partners
export const getPartners = (room_id) =>{
  return axios.get(`http://localhost:8000/api/chat/status/${room_id}`)
}