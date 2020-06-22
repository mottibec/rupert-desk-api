import entity from "./entity";

export default class user implements entity {
    entityName: string = "user";
    public id!: string;
    public name!: string;
    public hashedPassword!: string;
    public email!: string;
}