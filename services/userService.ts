import { injectable } from "inversify";
import { user } from "../models/user";

@injectable()
export class userService {
    findByEmail(email: string): user {
        return new user();
    }
    createUser(user: user): boolean {
        return true;
    }
}