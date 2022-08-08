export const goToFeedPage = (navigate) => {
    navigate("/")
}

export const goToLoginPage = (navigate) => {
    navigate("/login")
}

export const goToSignUpPage = (navigate) => {
    navigate("/signup")
}

export const goToAddPollPage = (navigate) => {
    navigate("/adicionar-enquete")
}

export const goToVotePage = (navigate, id) => {
    navigate(`/votacao/${id}`)
}

export const goBack = (navigate) => {
    navigate(-1)
}