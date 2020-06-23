import { postgresRepository } from "./postgresRepository";
import { workbook } from "../models/workbook";
import { injectable, inject } from "inversify";
import { databaseManager } from "./databaseManager";
import { TYPES } from "../config/inversify.types";

@injectable()
export class workbookRepository extends postgresRepository<workbook> {
    constructor(@inject(TYPES.databaseManager) dbManager: databaseManager) {
        super(dbManager);
        this.entityName = "workbooks";
    }
    save(workbooks: workbook[]) {
        var isAllSuccsess = workbooks.map(workbook => this.create(workbook));
    }
    async findByString(query: string) {
        try {
            const orQuery = query.split(' ').join(' | ');
            const tsquery = `to_tsquery('${orQuery}');`;
            const tsvector = `to_tsvector(name || ' ' || id)`;
            const result = await this.knex.raw(`select * from workbooks WHERE ${tsvector} @@ ${tsquery}`);
            const workbooks = result.rows;
            return workbooks;
        } catch (error) {
            console.error(error);
        }
    }
}