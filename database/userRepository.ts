import { postgresRepository } from "./postgresRepository";
import user from "../models/user";
import { injectable, inject } from "inversify";
import { TYPES } from "../config/inversify.types";
import { databaseManager } from "./databaseManager";

@injectable()
export class userRepository extends postgresRepository<user> {
    constructor(@inject(TYPES.databaseManager) dbManager: databaseManager) {
        super(dbManager)
    }
    async findByEmail(email: string): Promise<user | undefined> {
        const user = await this.knex<user>("users")
            .where({ email: email })
            .first()
        return user;
    }
}
