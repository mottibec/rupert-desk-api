import { postgresRepository } from "./postgresRepository";
import { workbook } from "../models/workbook";
import { injectable, inject } from "inversify";
import { memoryRepository } from "./memoryRepository";
import { databaseManager } from "./databaseManager";
import { TYPES } from "../config/inversify.types";

@injectable()
export class workbookRepository extends postgresRepository<workbook> {
    constructor(@inject(TYPES.databaseManager) dbManager: databaseManager) {
        super(dbManager)
    }
    save(workbooks: workbook[]) {
        var isAllSuccsess = workbooks.map(workbook => this.create(workbook));
    }
    async findByString(query: string) {
        try {
            const workbooks = await this.knex("workbook");
            return workbooks;
        } catch (error) {
            console.error(error);
        }
    }
}