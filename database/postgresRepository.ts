import { IRepository } from "./IRepository";
import pg from "knex";
import config from "../config/config";
import { injectable } from "inversify";

@injectable()
export class postgresRepository<TEntity> implements IRepository<TEntity> {
    protected knex: pg<any, unknown[]>;
    constructor() {
        this.knex = pg({
            client: 'pg',
            connection: config.databaseConnectionString,
            searchPath: ['knex', 'public'],
        });
    }
    create(item: TEntity): boolean {
        try {
            const result = this.knex("workbook").insert(item);
            return result != null;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }
    update(item: TEntity): boolean {
        throw new Error("Method not implemented.");
    }
    find(query: any): TEntity[] {
        throw new Error("Method not implemented.");
    }
    findOne(query: any): TEntity | null {
        throw new Error("Method not implemented.");
    }
    findById(id: string): TEntity | null {
        throw new Error("Method not implemented.");
    }
    getAll() {

    }
}