import { injectable, inject } from "inversify";
import user from "../models/user";
import { TYPES } from "../config/inversify.types";
import { userRepository } from "../database/userRepository";

@injectable()
export class userService {
    @inject(TYPES.userRepository)
    private _userRepository!: userRepository;

    findByEmail(email: string): Promise<user | undefined> {
        return this._userRepository.findByEmail(email);
    }
    createUser(user: user): Promise<boolean> {
        return this._userRepository.create(user);
    }
}