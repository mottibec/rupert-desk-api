import UserSchema from "../database/models/mongoose/user"
import { iUser } from "../models/user";
import { injectable } from "inversify";
import { MongoRepository } from "./mongoRepository";

@injectable()
export class UserRepository extends MongoRepository<iUser> {
  constructor() {
    super(UserSchema);
  }
}