import React from "react";
import {Routes, Route} from "react-router-dom"
import AddPollPage from "../pages/AddPollPage/AddPollPage"
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FeedPage from "../pages/FeedPage/FeedPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import VotePage from "../pages/VotePage/VotePage"

const Router = ({setRightButtonText}) => {
    return (
            <Routes>
                <Route path={"/"} element={ <FeedPage/> } />
                <Route path={"/login"} element={ <LoginPage setRightButtonText={setRightButtonText}/> } />
                <Route path={"/signup"} element={ <SignUpPage setRightButtonText={setRightButtonText}/> } />
                <Route path={"/adicionar-enquete"} element={ <AddPollPage/> } />
                <Route path={"/votacao/:id"} element={ <VotePage/> } />
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
    )
}

export default Router