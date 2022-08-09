import logo from "../../assets/logo.png"
import { MainContainer } from "./styled";
import {goToFeedPage, goToLoginPage} from "../../routes/coordinator"
import {useNavigate} from "react-router-dom"


const Header = ({rightButtonText, setRightButtonText}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const logout = () => {
        localStorage.removeItem("token")
    }

    const rightButtonAction = () => {
        if(token){
            logout()
            setRightButtonText("Login")
            goToLoginPage(navigate)
        }else{
            goToLoginPage(navigate)
        }
    }
    return(
        <MainContainer>
                <img src = {logo} alt="logo do ministério da magia" onClick={() => goToFeedPage(navigate)}/>
                <button onClick={rightButtonAction}>{rightButtonText}</button>
        </MainContainer>
    )
}

export default Header;