import UserDatabse from "../data/UsersDatabase";
import UserModel, { InputUserDTO} from "../models/UsersModel";
import { Authenticator } from "../services/Autheticator";
import { HashManage } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export default class UsersBusiness {
    constructor(
        private idGenerator = new IdGenerator,
        private authenticator = new Authenticator,
        private hash = new HashManage,
        private userData = new UserDatabse
    ){}

    public signUp = async(input: InputUserDTO) => {
        try {
            const {nickname, password} = input

            if(!nickname || !password){
                throw new Error("Please fill all fields")
            }

            const registeredNickname = await this.userData.findNickname(nickname)
            if(registeredNickname){
                throw new Error("This nickname is already registered") 
            }

            if(password.length < 7){
                throw new Error("The password must have at least 7 characters")
            }

            const id: string = this.idGenerator.generate()
            const hashPass: string = await this.hash.hashPassword(password)

            const newUser = new UserModel(
                id,
                nickname,
                hashPass,
            )

            await this.userData.signUp(newUser)

            const token = this.authenticator.generateToken({id})

            return token
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public login = async(input: InputUserDTO) => {
        try {
            const {nickname, password} = input

            if(!nickname || !password){
                throw new Error("Please fill all fields")
            }

            const user = await this.userData.findNickname(nickname)
            if(!user){
                throw new Error("Nickname or passward incorrect")
            }

            const passCorrect: boolean = await this.hash.compare(password, user.getPassword())
            if(!passCorrect){
                throw new Error("Nickname or passward incorrect")
            }
            const id: string = user.getId()
            const token = this.authenticator.generateToken({id})
            
            return token
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}