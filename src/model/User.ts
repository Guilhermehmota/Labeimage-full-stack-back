

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string
    ){}

    public getId(): string {
        return this.id;
    }

    public getName(): string{
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getNickname(): string{
        return this.nickname
    }

    public getPassword(): string {
        return this.password;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setEmail(email: string){
        this.email = email;
    }

    setNickname(nickname: string){
        this.nickname = nickname
    }

    setPassword(password: string){
        this.password = password;
    }

    // static toUserModel(user: any): User {
    //     return new User(user.id, user.name, user.email, user.nickname, user.password);
    // }

}

export interface UserInputDTO{
    name: string;
    email: string;
    nickname: string;
    password: string;    
}

export interface LoginInputDTO{
    email: string;
    password: string;
}


