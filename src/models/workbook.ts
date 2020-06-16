export class workbook {
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
