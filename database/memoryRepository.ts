import { IRepository } from "./IRepository";
import { injectable } from "inversify";

@injectable()
export class memoryRepository<T> implements IRepository<T> {
    protected items: T[]
    constructor() {
        this.items = [];
    }
    find(query: any): Promise<T[]> {
        return Promise.resolve(this.items);
    }
    create(item: T): Promise<boolean> {
        console.log(item);
        this.items.push(item);
        return Promise.resolve(true);
    }

    findById(id: string): Promise<T | null> {
        var item = this.items[0]
        return Promise.resolve(item);
    }

}