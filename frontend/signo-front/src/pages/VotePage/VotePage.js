import React from "react"
import {useNavigate} from "react-router-dom"
import { goBack } from "../../routes/coordinator" 
import useProtectedPage from "../../hooks/UseProtectedPage"

const VotePage = () => {
    useProtectedPage()
    const navigate = useNavigate()
    return(
        <div>
            <h1>Vote Page</h1>
            <button onClick={() => goBack(navigate)}>Voltar</button>
        </div>
    )
}

export default VotePage;