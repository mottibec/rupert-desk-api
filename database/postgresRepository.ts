import { IRepository } from "./IRepository";
import pg from "knex";
import { injectable, inject } from "inversify";
import { databaseManager } from "./databaseManager";

@injectable()
export class postgresRepository<TEntity> implements IRepository<TEntity> {
    protected knex: pg<any, unknown[]>;
    constructor(dbManager: databaseManager) {
        this.knex = dbManager.getConnection();
    }
    async create(item: TEntity): Promise<boolean> {
        try {
            const result = await this.knex("workbooks").insert(item);
            return result != null;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }
    async update(item: TEntity): Promise<boolean> {
        const result = await this.knex("workbooks").update(item);
        return result != 0;
    }
    async find(query: any): Promise<TEntity[]> {
        const result = await this.knex<TEntity>("workbooks").where(query);
        return result as TEntity[];
    }
    async findOne(query: any): Promise<TEntity | null> {
        const result = await this.knex<TEntity>("workbooks").first(query);
        return result as TEntity;
    }
    async findById(id: string): Promise<TEntity | null> {
        const result = await this.knex<TEntity>("workbooks").where(id).first();
        return result as TEntity;
    }
    async getAll() {
        const workbooks = await this.knex<TEntity>("workbooks");
        return workbooks;
    }
}