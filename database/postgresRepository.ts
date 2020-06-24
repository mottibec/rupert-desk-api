import { IRepository } from "./IRepository";
import pg from "knex";
import { injectable, inject } from "inversify";
import { databaseManager } from "./databaseManager";
import entity from "../models/entity";

@injectable()
export class postgresRepository<TEntity extends entity> implements IRepository<TEntity> {
    protected knex: pg<any, unknown[]>;
    protected entityName!: string;
    constructor(dbManager: databaseManager) {
        this.knex = dbManager.getConnection();
    }
    async create(item: TEntity): Promise<boolean> {
        try {
            const result = await this.knex(this.entityName).insert(item);
            return result != null;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }
    async update(item: TEntity): Promise<boolean> {
        const result = await this.knex(this.entityName).update(item);
        return result != 0;
    }
    async find(query: any): Promise<TEntity[]> {
        const result = await this.knex<TEntity>(this.entityName).where(query);
        return result as TEntity[];
    }
    async findOne(query: any): Promise<TEntity | null> {
        const result = await this.knex<TEntity>(this.entityName).first(query);
        return result as TEntity;
    }
    async findById(id: string): Promise<TEntity | null> {
        const query = { id: id };
        const result = await this.knex<TEntity>(this.entityName)
            .where(query)
            .first();
        return result as TEntity;
    }
    async getAll() {
        const workbooks = await this.knex<TEntity>(this.entityName);
        return workbooks;
    }
}