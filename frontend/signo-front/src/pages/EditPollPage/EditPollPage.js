import { Button, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import axios from "axios"
import useProtectdPage from "../../hooks/UseProtectedPage";
import useRequestData from "../../hooks/UseRequestData";
import { editPoll } from "../../services/polls";
import { goBack } from "../../routes/coordinator";

const EditPollPage = () => {
    useProtectdPage()
    const navigate = useNavigate()
    const params = useParams()
    const poll = useRequestData({}, `${BASE_URL}/polls/${params.id}`)
    const [title, setTitle] = useState("")
    const [start_date, setStart_date] = useState("")
    const [end_date, setEnd_date] = useState("")
    const token = localStorage.getItem("token")
    const headers = {
    headers: {
      authorization: token,
    },
    }
    const body = {
      title,
      start_date,
      end_date
  }

    // let formatedEndMonth
    // let formatedStartMonth
    // let startMonth = new Date(poll[0].start_date).getMonth() + 1
    // let endMonth = new Date(poll[0].end_date).getMonth() + 1
    // if(startMonth < 10){
    //   formatedStartMonth = "0" + startMonth
    // }else{
    //   formatedStartMonth = startMonth
    // }
    // if(endMonth < 10){
    //   formatedEndMonth = "0" + startMonth
    // }else{
    //   formatedEndMonth = endMonth
    // }

    // const newStartDate = new Date(poll[0].start_date)
    // const newEndDate = new Date(poll[0].end_date)
    // const startDateFormated = ((newStartDate.getDate())) + "-" + formatedStartMonth + "-" + newStartDate.getFullYear()
    // const endDateFormated = ((newEndDate.getDate())) + "-" + formatedEndMonth + "-" + newEndDate.getFullYear()

    const getPoll = async() => {
      await axios.get(`${BASE_URL}/polls/${params.id}`, headers)
      .then((res) => {
          setTitle(poll[0] && poll[0].title)
          setStart_date(poll[0] && poll[0].start_date)
          setEnd_date(poll[0] && poll[0].end_date)
      })
      .catch((err) => {
          console.log(err.response)
      })
    }
    
      const onSubmitForm = (event) => {
        event.preventDefault()
        editPoll(body, params.id, headers)
      }

      useEffect(() => {
        getPoll()
      },[])

    return(
        <div>
            <h3>Editar</h3>
            <form onSubmit={onSubmitForm}>
                <TextField
                name={"title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                type={"text"}
                multiline
                rows={4}
                variant="outlined"
                />
                <p>Data de início</p>
                <TextField
                name={"start_date"}
                // label={startDateFormated}
                value={start_date}
                onChange={(e) => setStart_date(e.target.value)}
                type={"date"}
                variant="outlined"
                />
                <p>Data de término</p>
                <TextField
                name={"date"}
                // label={endDateFormated}
                value={end_date}
                onChange={(e) => setEnd_date(e.target.value)}
                type={"date"}
                variant="outlined"
                />
                <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                >
                Salvar
                </Button>
             </form>
             <Button variant={"text"} color={"primary"} onClick={() => {goBack(navigate)}}>Voltar</Button>
        </div>
    )
}

export default EditPollPage