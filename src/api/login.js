import axios from './axios'

export function login({userName , password}) {
  return axios.post("/api/user/login",{
    userName,
    password
  });
}


