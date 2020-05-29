import { IUserRepository } from "./UserRepository";
import { User } from "../models/entities/User";
import { getRepository } from 'typeorm';
import { Request } from 'express';
import { IUser } from '../models/User';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';

export class UserService implements IUserRepository {

    async get(): Promise<User[] | null> {
        // Get users from database
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find({});
            return users;
        }
        catch (error) {
            return null
        }
    }
    async getById(id: number): Promise<User | null> {

        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            return user;
        } catch (error) {
            return null;
        }
    }
    async add(model: IUser): Promise<User | null> {
        const { username, role, password, email } = model;
        const user = new User();
        user.username = username;
        user.role = role;
        user.password = password;
        user.email = email
        const userRepository = getRepository(User);
        try {
            const savedUser = await userRepository.save(user);
            return savedUser;
        } catch (e) {
            console.log(e);
            return Promise.reject(new APIError('User Already exists', Err.EmailAlreadyExists));
        }
    }
    async delete(id: number): Promise<User | null> {
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
            if (user) {
                userRepository.delete(id);
            }
            return null;
        } catch (error) {
            return null;
        }
    }

}