import bcrypt from "bcrypt";
import { injectable } from "inversify";

@injectable()
export default class AuthService {
    async hash(str: string) {       
        const salt = await bcrypt.genSalt(10);       
        return await bcrypt.hash(str, salt);
    }
    async verifyHash(str: string, hash: string) {
        return await bcrypt.compare(str, hash);
    }
}