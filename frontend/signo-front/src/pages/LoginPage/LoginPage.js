import React from "react"
import {goToFeedPage, goToSignUpPage} from "../../routes/coordinator"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Login Page</h1>
            <button onClick={() => goToFeedPage(navigate)} > Entrar </button>
            <button onClick={() => goToSignUpPage(navigate)}> Cadastrar </button>
        </div>
    )
}

export default LoginPage;