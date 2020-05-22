import "reflect-metadata";
import { Container } from "inversify";

import SERVICE_IDENTIFIER from "./constants";
import { IUserRepository } from "./repositories/UserRepository";
import { UserActions } from "./repositories/UserActions";

let container = new Container();
container.bind<IUserRepository>(SERVICE_IDENTIFIER.IUserRepository).to(UserActions);

export default container;