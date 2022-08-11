import React from "react"
import {useNavigate, useParams} from "react-router-dom"
import useProtectedPage from "../../hooks/UseProtectedPage"
import useRequestData from "../../hooks/UseRequestData"
import {BASE_URL} from "../../constants/urls"
import { Button } from "@material-ui/core"
import { createVote, deletePoll } from "../../services/polls"
import { goBack} from "../../routes/coordinator"
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {deleteAllAnswers} from "../../services/answers"

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
    const votes  = useRequestData([], `${BASE_URL}/polls/votes/${params.id}`)

    const newStartDate = new Date(poll.start_date)
    const newEndDate = new Date(poll.end_date)
    const startDateFormated = ((newStartDate.getDate())) + "/" + ((newStartDate.getMonth() + 1)) + "/" + newStartDate.getFullYear()
    const endDateFormated = ((newEndDate.getDate())) + "/" + ((newEndDate.getMonth() + 1)) + "/" + newEndDate.getFullYear()
  

    const votesCard = votes.map((vote) => {
      return (
        <div>
          <p>{vote.answer}: {vote.votes} votos</p>
        </div>
      )
    })
    const deleteThis = () => {
      deleteAllAnswers(params.id, headers, navigate)
    }
    const submitVote = (vote) => {
      createVote(vote, params.id, headers)
  }

    return(
        <div>
          <div>
            <h2>{poll && poll.title}</h2>
            <p>Início da votação: {startDateFormated}</p>
            <p>Término da votação: {endDateFormated}</p>
            <EditIcon/>
            <DeleteIcon onClick={deleteThis}/>
          </div>
          <div>
            <Button variant={"contained"} color={"primary"} onClick={() => submitVote("CONCORDO")}>Concordo</Button>
            <br/>
            <Button variant={"contained"} color={"primary"}  onClick={() => submitVote("CONCORDO PARCIALMENTE")}>Concordo Parcialmente</Button>
            <br/>
            <Button variant={"contained"} color={"primary"} onClick={() => submitVote("DISCORDO")} >Discordo</Button>
            <br/>
            <Button variant={"contained"} color={"primary"} onClick={() => submitVote("NÃO SEI OPINAR")}>Não sei opinar</Button>
            <br/>
          </div>
          <div>
            <h3>Tabela de votação:</h3>
            {votesCard}
          </div>
          <Button variant={"text"} color={"primary"} onClick={() => {goBack(navigate)}}>Voltar</Button>
        </div>
    )
}

export default VotePage;