  // src/client-container
  'use client'
  import 'reflect-metadata'
  import { Container } from 'typedi'
  import GetEventsUseCase from '../../usecases/events/getEvents';
  import EventService from '../../infrastructure/src/events/eventService';
  import EventInMemoryRepository from '../../infrastructure/src/events/eventInMemoryRepository';
  import ApiGateway from '../../infrastructure/src/gateways/gateway';
  import UserService from '../../infrastructure/src/users/userService';
import CreateEventUseCase from '../../usecases/events/createEvent';
import IRepository from '../../entities/common/interfaces/repository';
import EventDto from '../../entities/events/event';
import IGateway from '../../infrastructure/src/interfaces/gateway';
import IEventService from '../../usecases/common/interfaces/eventService';
import LoginUseCase from '../../usecases/auth/loginUseCase';
import IUserService from '../../usecases/common/interfaces/userService';
import UserDto from '../../entities/users/user';
import UserRepository from '../../infrastructure/src/users/userRepository';
import IAuthService from '../../usecases/common/interfaces/authService';
import AuthService from '../../infrastructure/src/auth/authService';
import RegistrationUseCase from '../../usecases/auth/registrationUseCase';

Container.set<IRepository<EventDto>>(EventInMemoryRepository, new EventInMemoryRepository());
Container.set<IGateway>(ApiGateway, new ApiGateway());
Container.set<IRepository<UserDto>>(UserRepository, new UserRepository());
Container.set<IEventService>(EventService, new EventService());
Container.set<IAuthService>(AuthService, new AuthService());
Container.set<IGateway>(ApiGateway, new ApiGateway());
Container.set<IUserService>(UserService, new UserService());
Container.set<GetEventsUseCase>(GetEventsUseCase, new GetEventsUseCase(Container.get<IEventService>(EventService)));
Container.set<CreateEventUseCase>(CreateEventUseCase, new CreateEventUseCase(Container.get<IEventService>(EventService)));
Container.set<LoginUseCase>(LoginUseCase, new LoginUseCase(Container.get<IAuthService>(AuthService)));
Container.set<RegistrationUseCase>(RegistrationUseCase, new RegistrationUseCase(Container.get<IUserService>(UserService)));

const GetEventUseCaseImpl = Container.get<GetEventsUseCase>(GetEventsUseCase);
const CreateEventUseCaseImpl = Container.get<CreateEventUseCase>(CreateEventUseCase);
const LoginUseCaseImpl = Container.get<LoginUseCase>(LoginUseCase);
const RegistrationUseCaseImpl = Container.get<RegistrationUseCase>(RegistrationUseCase);

export {
    GetEventUseCaseImpl,
    CreateEventUseCaseImpl,
    LoginUseCaseImpl,
    RegistrationUseCaseImpl
}