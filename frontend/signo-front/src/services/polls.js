import axios from "axios"
import {BASE_URL} from "../constants/urls"

export const createPoll = (body, clear, headers) => {
    axios.post(`${BASE_URL}/polls`, body, headers)
    .then((res) => {
        clear()
        alert(res.data)
    })
    .catch((err) => {
        alert(err.response.data.message)
    })
}

export const createVote = (vote, id, headers) => {
    const body ={
        answer: vote
    }
    axios.post(`${BASE_URL}/polls/${id}`, body, headers)
    .then((res) => {
        console.log(res.data.message)
    })
    .catch((err) => {
        console.log(err.response.data.message)
    })
}