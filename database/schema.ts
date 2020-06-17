import knex from "knex";

export function createWoorkbooks() {
    knex({}).schema.table("workbooks", table => {
        table.string("id");
        table.string("name");
        table.string("url");
    });
}

export function createViews() {
    knex({}).schema.table("views", table => {
        table.string("id");
        table.string("name");
        table.string("url");
        table.json("tags")
    });
}