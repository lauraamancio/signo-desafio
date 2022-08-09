import styled from "styled-components"

export const MainContainer = styled.div `
    width: 100vw;
    height: 15vh;
    background-color: #b18e3c;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    img{
        height: 12vh;
        max-height: 115px;
        margin: 5%;
        cursor: pointer;
    }

    button{
        margin: 5%;
    }
`