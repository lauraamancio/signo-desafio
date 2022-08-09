import axios from "axios"
import {BASE_URL} from "../constants/urls"
import {goToFeedPage} from "../routes/coordinator"

export const login = (body, clear, navigate) => {
    axios.post(`${BASE_URL}/users/login`, body)
    .then((res) => {
      localStorage.setItem("token", res.data.token)
      clear()
      goToFeedPage(navigate)
    })
    .catch((err)=> alert(err.response.data.message))
  }

export const signup = (body, clear, navigate) => {
  axios.post(`${BASE_URL}/users/signup`, body)
  .then((res) => {
    localStorage.setItem("token", res.data.token)
    goToFeedPage(navigate)
    clear()
  })
  .catch((err) => alert(err.response.data.message))
}