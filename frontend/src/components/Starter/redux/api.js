import axios from "axios"


export const initialize = (body) =>{
  return axios.post("http://localhost:8000/api/chat/initialize", body)
}