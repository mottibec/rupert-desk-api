import { ICredentialsProvider, ICredentials, passwordCredentials, patCredentials } from "./credentialsProvider";


export class tableauCredentialsProvider implements ICredentialsProvider {
    getCredentials(): ICredentials[] {
        return [
            new passwordCredentials(),
            new patCredentials()
        ]
    }

}