import entity from "./entity";

export class workbook implements entity {
    id!: string;
    name!: string;
    contentUrl!: string;
    webpageUrl!: string;
    createdAt!: string;
    updatedAt!: string;
    constructor(id: string, name: string, contentUrl: string, webpageUrl: string) {
        this.id = id;
        this.name = name;
        this.contentUrl = contentUrl;
        this.webpageUrl = webpageUrl;
    }
   
}
