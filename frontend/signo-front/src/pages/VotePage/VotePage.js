import React, { useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom"
import useProtectedPage from "../../hooks/UseProtectedPage"
import useRequestData from "../../hooks/UseRequestData"
import {BASE_URL} from "../../constants/urls"
import { Button } from "@material-ui/core";
import { createVote } from "../../services/polls"
import { goBack } from "../../routes/coordinator"

const VotePage = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const headers = {
        headers: {
          authorization: token,
        },
      }
    const params = useParams()
    const poll = useRequestData({}, `${BASE_URL}/polls/${params.id}`)
    const votes = useRequestData([], `${BASE_URL}/polls/votes/${params.id}`)

    const newStartDate = new Date(poll.start_date)
    const newEndDate = new Date(poll.end_date)
    const startDateFormated = ((newStartDate.getDate())) + "/" + ((newStartDate.getMonth() + 1)) + "/" + newStartDate.getFullYear()
    const endDateFormated = ((newEndDate.getDate())) + "/" + ((newEndDate.getMonth() + 1)) + "/" + newEndDate.getFullYear()
    
    const submitVote = (vote) => {
        createVote(vote, params.id, headers)
    }

    const [discordo, concordo, concordo_parcialmente, nao_sei_opinar] = votes

    return(
        <div>
          <h2>{poll && poll.title}</h2>
          <p>Início da votação: {startDateFormated}</p>
          <p>Término da votação: {endDateFormated}</p>
          <div>
            <Button variant={"contained"} color={"primary"} onClick={() => submitVote("CONCORDO")}>Concordo</Button>
            {concordo? concordo.votes : 0} votos
            <br/>
            <Button variant={"contained"} color={"primary"}  onClick={() => submitVote("CONCORDO PARCIALMENTE")}>Concordo Parcialmente</Button>
            {concordo_parcialmente? concordo_parcialmente.votes : 0} votos
            <br/>
            <Button variant={"contained"} color={"primary"} onClick={() => submitVote("DISCORDO")} >Discordo</Button>
            {discordo? discordo.votes : 0} votos
            <br/>
            <Button variant={"contained"} color={"primary"} onClick={() => submitVote("NÃO SEI OPINAR")}>Não sei opinar</Button>
            {nao_sei_opinar? nao_sei_opinar.votes : 0} votos
            <br/>
          </div>
          <Button variant={"text"} color={"primary"} onClick={() => {goBack(navigate)}}>Voltar</Button>
        </div>
    )
}

export default VotePage;