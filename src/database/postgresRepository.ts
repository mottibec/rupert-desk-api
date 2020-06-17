import { IRepository } from "./IRepository";
import pg from "knex";
import config from "../config/config";

export class postgresRepository<TEntity> implements IRepository<TEntity> {
    protected _knex: pg<any, unknown[]>;
    constructor() {
        this._knex = pg({
            client: 'pg',
            connection: config.databaseConnectionString,
            searchPath: ['knex', 'public'],
        });
    }
    create(item: TEntity): boolean {
        const result = this._knex("table").insert(item);
        return result != null;
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