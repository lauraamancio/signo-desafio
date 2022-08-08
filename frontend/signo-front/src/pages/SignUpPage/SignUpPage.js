import React from "react"
import {useNavigate} from "react-router-dom"
import {goToFeedPage} from "../../routes/coordinator"

const SignUpPage = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h1>SignUp Page</h1>
            <button onClick={()=> goToFeedPage(navigate)}>Cadastrar</button>
        </div>
    )
}

export default SignUpPage;