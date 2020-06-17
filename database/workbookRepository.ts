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
        const words = query.split(' ');
        console.log("words", words);
        const result = this.items.filter(item => {
            for (let [key, value] of Object.entries(item)) {
                console.log("value", value);
                if (words.indexOf(value) != -1) {
                    return true;
                }
            }
        });
        return Promise.resolve(result);
    }
}