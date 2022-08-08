import logo from "../../assets/logo.png"
import { MainContainer } from "./styled";
import {goToFeedPage} from "../../routes/coordinator"
import {useNavigate} from "react-router-dom"
const Header = () => {
    const navigate = useNavigate()
    return(
        <MainContainer>
            <div>
                <img src = {logo} alt="logo do ministério da magia" onClick={() => goToFeedPage(navigate)}/>
            </div>
        </MainContainer>
    )
}

export default Header;