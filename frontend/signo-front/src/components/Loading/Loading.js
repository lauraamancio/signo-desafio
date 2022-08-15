import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress'
import { LoadingContainer } from "./styled"

const Loading = () => {
    return (
        <LoadingContainer>
            <CircularProgress color={"primary"} size={30}/>
        </LoadingContainer>
    )
}

export default Loading