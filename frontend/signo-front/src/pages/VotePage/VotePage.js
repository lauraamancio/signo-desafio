import React from "react"
import {useNavigate, useParams} from "react-router-dom"
import useProtectedPage from "../../hooks/UseProtectedPage"
import useRequestData from "../../hooks/UseRequestData"
import {BASE_URL} from "../../constants/urls"
import { Button } from "@material-ui/core"
import { createVote} from "../../services/polls"
import { goBack, goToEditPage} from "../../routes/coordinator"
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {deleteAllAnswers} from "../../services/answers"
import { Icons, MainContainer, OutDateVote, TitleCard, VoteCard, VoteContainer } from "./styled"

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
    const [poll] = useRequestData({}, `${BASE_URL}/polls/${params.id}`)
    const [votes, getVotes]  = useRequestData([], `${BASE_URL}/polls/votes/${params.id}`)

    const newStartDate = new Date(poll.start_date)
    const newEndDate = new Date(poll.end_date)
    const startDateFormated = ((newStartDate.getDate() +1)) + "/" + ((newStartDate.getMonth() + 1)) + "/" + newStartDate.getFullYear()
    const endDateFormated = ((newEndDate.getDate() +1)) + "/" + ((newEndDate.getMonth() + 1)) + "/" + newEndDate.getFullYear()

    const deleteThis = () => {
      deleteAllAnswers(params.id, headers, navigate)
    }
    const submitVote = (vote) => {
      createVote(vote, params.id, headers, getVotes)
    }

    const [discordo, concordo_parc, nao_sei, concordo] = votes

    return(
        <MainContainer>
          <TitleCard>
            <h2>{poll && poll.title}</h2>
            <p>Início da votação: {startDateFormated}</p>
            <p>Término da votação: {endDateFormated}</p>
            <Icons>
              <EditIcon onClick={() => goToEditPage(navigate, params.id)}/>
              <DeleteIcon onClick={deleteThis}/>
            </Icons>
          </TitleCard>
          <VoteContainer>
            {new Date().setUTCHours(0, 0, 0, 0) < newStartDate || new Date().setUTCHours(0, 0, 0, 0) > newEndDate +1 ? 
            <OutDateVote>
             <h3>Fora do período de votação</h3>
             <Button variant={"contained"} color={"primary"} disabled>Concordo</Button>
             <Button variant={"contained"} color={"primary"}  disabled>Concordo Parcialmente</Button>
             <Button variant={"contained"} color={"primary"} disabled >Discordo</Button>
             <Button variant={"contained"} color={"primary"} disabled>Não sei opinar</Button>
             </OutDateVote>
             : 
             <div>
              <VoteCard>
                <Button variant={"contained"} color={"primary"} onClick={() => submitVote("CONCORDO")}>Concordo</Button>
                {concordo? concordo.votes : 0} votos
              </VoteCard>
             <VoteCard>
                <Button variant={"contained"} color={"primary"}  onClick={() => submitVote("CONCORDO PARCIALMENTE")}>Concordo Parcialmente</Button>
                {concordo_parc? concordo_parc.votes : 0} votos
             </VoteCard>
             <VoteCard>
                <Button variant={"contained"} color={"primary"} onClick={() => submitVote("DISCORDO")} >Discordo</Button>
                {discordo? discordo.votes : 0} votos
             </VoteCard>
            <VoteCard>
              <Button variant={"contained"} color={"primary"} onClick={() => submitVote("NÃO SEI OPINAR")}>Não sei opinar</Button>
              {nao_sei? nao_sei.votes : 0} votos
            </VoteCard>
             </div>
            }
          </VoteContainer>
          <Button variant={"text"} color={"primary"} onClick={() => {goBack(navigate)}}>Voltar</Button>
        </MainContainer>
    )
}

export default VotePage;