import { app } from "./app";
import PollsController from "./controller/PollsConroller";
import UserController from "./controller/UserController";

const userController = new UserController
const pollController = new PollsController

app.post("/users/signup", userController.signUp)
app.post("/users/login", userController.login)
app.post("/polls", pollController.createPoll)