import React from "react"
import {useNavigate} from "react-router-dom"
import {goBack} from "../../routes/coordinator"

const AddPollPage = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Add Poll Page</h1>
            <button onClick={() => goBack(navigate)}>Voltar</button>
        </div>
    )
}

export default AddPollPage;