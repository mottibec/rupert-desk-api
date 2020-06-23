import entity from "./entity";

export default class user implements entity {
    public id!: string;
    public name!: string;
    public hashedPassword!: string;
    public email!: string;
    constructor(email: string, hashedPassword: string) {
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}