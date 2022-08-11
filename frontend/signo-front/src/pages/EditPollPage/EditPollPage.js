import { Button, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import axios from "axios"
import useProtectdPage from "../../hooks/UseProtectedPage";
import useRequestData from "../../hooks/UseRequestData";
import { editPoll } from "../../services/polls";

const EditPollPage = () => {
    useProtectdPage()
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
      };

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
                value={start_date}
                onChange={(e) => setStart_date(e.target.value)}
                type={"date"}
                variant="outlined"
                />
                <p>Data de término</p>
                <TextField
                name={"date"}
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
        </div>
    )
}

export default EditPollPage