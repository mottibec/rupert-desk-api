import { TYPES } from "../config/inversify.types";
import { inject, injectable } from "inversify";
import { AccountRepository } from "../database/AccountRepository";
import { iAccount } from "../models/account";

@injectable()
export class AccountService {
    @inject(TYPES.AccountRepository)
    private _accountRepository!: AccountRepository;

    findByEmail(email: string) {
        return this._accountRepository.findOne({ 'email': email });
    }
    getAccount(id: any) {
        return this._accountRepository.findOne({ 'id': id });
    }
    createAccount(account: iAccount) {
        return this._accountRepository.create(account);
    }
    getAllAccounts() {
        return this._accountRepository.find({});
    }
    update(account: iAccount): Promise<boolean> {
        return this._accountRepository.update(account);
    }
}