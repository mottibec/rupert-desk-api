const TYPES = {
    IWebServer: Symbol.for("IWebServer"),
    IController: Symbol.for("IController"),
    IAuthProvider: Symbol.for("IAuthProvider"),
    JWTService: Symbol.for("JWTService"),
    AuthService: Symbol.for("AuthService"),
    UserService: Symbol.for("UserService"),
    IIntegrationProvider: Symbol.for("IIntegrationProvider"),
    WorkbookService: Symbol.for("WorkbookService"),
    WorkbookRepository: Symbol.for("WorkbookRepository")
};
export { TYPES };