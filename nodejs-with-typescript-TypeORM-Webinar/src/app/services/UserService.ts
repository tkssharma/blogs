import { IUserRepository } from "../repositories/UserRepository";
import { User } from "../models/entities/User";

export class UserService {

    private repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }
    get(): Promise<User[] | null> {
        return this.repository.get();
    }
    getById(id: number): Promise<User | null> {
        return this.repository.getById(id);
    }
    add(User: User): Promise<User | null> {
        return this.repository.add(User);
    }
    delete(id: number): Promise<User | null> {
        return this.repository.delete(id);
    }
}