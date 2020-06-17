import { postgresRepository } from "./postgresRepository";
import { workbook } from "../models/workbook";
import { injectable } from "inversify";
import { memoryRepository } from "./memoryRepository";

@injectable()
export class workbookRepository extends memoryRepository<workbook> {
    save(workbooks: workbook[]) {
        var isAllSuccsess = workbooks.map(workbook => this.create(workbook));
    }
    getAll() {
        const workbooks = this.items;
        console.log("workbooks", workbooks);
        return Promise.resolve(workbooks);
    }
    findByString(query: string) {

    }
}