interface IRequest {
    params: any;
    body: any;
    user?: any;
}

interface IResponse {
    sendFile(item: any): any;
    json(item: any): any;
    status(resultCode: number): any;
    send(item: any): any;
    render(route: string, item: any): void;
}

export { IRequest, IResponse };