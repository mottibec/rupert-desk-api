import { postgresRepository } from "./postgresRepository";
import { workbook } from "../models/workbook";
import { injectable } from "inversify";
import { memoryRepository } from "./memoryRepository";

@injectable()
export class workbookRepository extends postgresRepository<workbook> {
    save(workbooks: workbook[]) {
        var isAllSuccsess = workbooks.map(workbook => this.create(workbook));
    }
    async findByString(query: string) {
        try {
            const workbooks = await this.knex();
            return workbooks;
        } catch (error) {
            console.error(error);
        }
    }
}