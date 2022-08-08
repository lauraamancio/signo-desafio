import React from "react"
import {useNavigate} from "react-router-dom"
import {goToAddPollPage} from "../../routes/coordinator"
import { goToVotePage } from "../../routes/coordinator"

const FeedPage = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Feed Page</h1>
            <button onClick={() => goToAddPollPage(navigate)}> Adicionar Enquete</button>
            <button onClick={()=> goToVotePage(navigate)}>Votar</button>
        </div>
    )
}

export default FeedPage;