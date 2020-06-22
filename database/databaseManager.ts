import pg from "knex";
import config from "../config/config";
import { injectable } from "inversify";

@injectable()
export class databaseManager {
    private _knex: pg<any, unknown[]>;
    constructor() {
        this._knex = pg({
            client: 'pg',
            connection: config.databaseConnectionString,
            searchPath: ['knex', 'public'],
        });
    }
    getConnection() {
        return this._knex;
    }
    initilize() {
        this.createWoorkbooks();
        this.createViews();
    }
    createWoorkbooks() {
        this._knex.schema.table("workbooks", table => {
            table.string("id");
            table.string("name");
            table.string("url");
        })
    }
    createViews() {
        this._knex.schema.table("views", table => {
            table.string("id");
            table.string("name");
            table.string("url");
            table.json("tags")
        });
    }
}