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
    async create(item: TEntity): Promise<boolean> {
        try {
            const result = await this.knex("workbook").insert(item);
            return result != null;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }
    async update(item: TEntity): Promise<boolean> {
        const result = await this.knex("workbook").update(item);
        return result != 0;
    }
    async find(query: any): Promise<TEntity[]> {
        const result = await this.knex("workbook").where(query);
        return result;
    }
    async findOne(query: any): Promise<TEntity | null> {
        const result = await this.knex("workbook").first(query);
        return result;
    }
    async findById(id: string): Promise<TEntity | null> {
        const result = await this.knex("workbook").where(id).first();
        return result;
    }
    getAll() {

    }
}