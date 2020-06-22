const TYPES = {
    IWebServer: Symbol.for("IWebServer"),
    IController: Symbol.for("IController"),
    IAuthProvider: Symbol.for("IAuthProvider"),
    JWTService: Symbol.for("JWTService"),
    passwordHashService: Symbol.for("passwordHashService"),
    userService: Symbol.for("userService"),
    IIntegrationProvider: Symbol.for("IIntegrationProvider"),
    WorkbookService: Symbol.for("WorkbookService"),
    WorkbookRepository: Symbol.for("WorkbookRepository"),
    databaseManager: Symbol.for("databaseManager")
};
export { TYPES };