import { injectable, inject } from "inversify";
import { workbookRepository } from "../database/workbookRepository";
import { TYPES } from "../config/inversify.types";

@injectable()
export default class workbookService {

    @inject(TYPES.WorkbookRepository)
    private _workbookRepo!: workbookRepository;

    get(id: string) {
        return this._workbookRepo.findById(id);
    }
    getAll() {
        return this._workbookRepo.getAll();
    }
    search(query: string) {
        return this._workbookRepo.findByString(query);
    }
}