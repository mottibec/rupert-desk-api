"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
function createWoorkbooks() {
    knex_1.default({}).schema.table("workbooks", function (table) {
        table.string("id");
        table.string("name");
        table.string("url");
    });
}
exports.createWoorkbooks = createWoorkbooks;
function createViews() {
    knex_1.default({}).schema.table("views", function (table) {
        table.string("id");
        table.string("name");
        table.string("url");
        table.json("tags");
    });
}
exports.createViews = createViews;
