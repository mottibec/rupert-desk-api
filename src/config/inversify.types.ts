const TYPES = {
    IWebServer: Symbol.for("IWebServer"),
    IController: Symbol.for("IController"),
    IAuthProvider: Symbol.for("IAuthProvider"),
    AccountRepository: Symbol.for("AccountRepository"),
    AccountService: Symbol.for("AccountService"),
    JWTService: Symbol.for("JWTService"),
    AuthService: Symbol.for("AuthService"),
    DbManager: Symbol.for("dbManager"),
    IIntegrationProvider: Symbol.for("IIntegrationProvider")
};
export { TYPES };