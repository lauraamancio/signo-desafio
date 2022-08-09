import React from "react"
import {useNavigate} from "react-router-dom"
import {goToAddPollPage} from "../../routes/coordinator"
import { goToVotePage } from "../../routes/coordinator"
import useProtectedPage from "../../hooks/UseProtectedPage"
import useRequestData from "../../hooks/UseRequestData"
import {BASE_URL} from "../../constants/urls"

const FeedPage = () => {
    useProtectedPage()
    const navigate = useNavigate()

    const polls = useRequestData([], `${BASE_URL}/polls`)

    const pollsCard = polls.map((poll) => {
        return <p>{poll.title}</p>
    })
    console.log(polls)
    return(
        <div>
            {pollsCard}
        </div>
    )
}

export default FeedPage;