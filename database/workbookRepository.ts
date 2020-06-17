import { postgresRepository } from "./postgresRepository";
import { workbook } from "../models/workbook";
import { injectable } from "inversify";

@injectable()
export class workbookRepository extends postgresRepository<workbook> {
    save(workbooks: workbook[]) {
        var isAllSuccsess = workbooks.map(workbook => this.create(workbook));
    }
    findByString(query: string){
       
    }
}