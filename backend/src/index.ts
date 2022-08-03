import { app } from "./app";
import UserController from "./controller/UserController";

const userController = new UserController

app.post("/users/signup", userController.signUp)
app.post("/users/login", userController.login)