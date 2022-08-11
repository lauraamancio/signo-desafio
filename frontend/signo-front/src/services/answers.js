import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { deletePoll } from "./polls"

export const deleteAllAnswers = (id, headers, navigate) => {
    axios.delete(`${BASE_URL}/polls/answer/${id}`, headers)
    .then((res) => {
        deletePoll(id, headers, navigate)
    })
    .catch((err) => {
        alert(err.response.data.message)
    })
}