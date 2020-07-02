
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum RoleEnum {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class CreateUserInput {
    username: string;
    password: string;
    email: string;
}

export class UpdateUserInput {
    username?: string;
    password?: string;
    email?: string;
}

export class LoginUserInput {
    username: string;
    password: string;
}

export class LoginResponse {
    token: string;
}

export class User {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: RoleEnum;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract me(): User | Promise<User>;

    abstract users(offset: number, limit: number): User[] | Promise<User[]>;

    abstract user(_id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract register(input: CreateUserInput): User | Promise<User>;

    abstract updateUser(_id: string, input: UpdateUserInput): boolean | Promise<boolean>;

    abstract deleteUser(_id: string): boolean | Promise<boolean>;

    abstract deleteUsers(): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract setRole(_id: string, role: RoleEnum): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}
