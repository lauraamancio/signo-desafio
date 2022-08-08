import React from "react"
import {goToFeedPage, goToSignUpPage} from "../../routes/coordinator"
import { useNavigate } from "react-router-dom"
import { Button } from "@material-ui/core"

const LoginPage = () => {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Login Page</h1>
            <Button color = "primary" variant="contained" onClick={() => goToFeedPage(navigate)} > Entrar </Button>
            <Button color = "primary" variant="contained" onClick={() => goToSignUpPage(navigate)}> Cadastrar </Button>
        </div>
    )
}

export default LoginPage;