export interface ICredentials {
    getFields(): any;
    get(): any;
}

export class passwordCredentials implements ICredentials {
    public name!: string;
    public password!: string;
    getFields() {
        return ["name", "password"];
    }
    get() {
        return { name: this.name, password: this.password }
    }

}

export class patCredentials implements ICredentials {
    public personalAccessTokenSecret!: string;
    public personalAccessTokenName!: string
    getFields() {
        return ["personalAccessTokenSecret", "personalAccessTokenName"];
    }
    get() {
        return {
            personalAccessTokenName: this.personalAccessTokenName,
            personalAccessTokenSecret: this.personalAccessTokenSecret
        }
    }
}

export interface ICredentialsProvider {
    getCredentials(): ICredentials[];
}
