import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "../components/Header/Header";
import AddPollPage from "../pages/AddPollPage/AddPollPage"
import FeedPage from "../pages/FeedPage/FeedPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import VotePage from "../pages/VotePage/VotePage"

const Router = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={ <FeedPage/> } />
                <Route path={"/login"} element={ <LoginPage/> } />
                <Route path={"/signup"} element={ <SignUpPage/> } />
                <Route path={"/adicionar-enquete"} element={ <AddPollPage/> } />
                <Route path={"/votacao/:id"} element={ <VotePage/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default Router