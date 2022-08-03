export default class UserModel {
    constructor(
        private id: string,
        private nickname: string,
        private password: string,
    ){}

    public getId() {
        return this.id
    }
    public getNickname() {
        return this.nickname
    }
    public getPassword() {
        return this.password
    }

    static todoUserModel(user: any): UserModel {
        return new UserModel(user.id, user.nickname, user.password)
    } 
}

export interface InputUserDTO {
    nickname: string,
    password: string,
}