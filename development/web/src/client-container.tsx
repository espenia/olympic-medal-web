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
import GetUsersUseCase from '../../usecases/users/getUsersUseCase';
import ChangePasswordUseCase from '../../usecases/auth/passwordChangeUseCase';

Container.set<IRepository<EventDto>>(EventInMemoryRepository, new EventInMemoryRepository());
Container.set<IGateway>(ApiGateway, new ApiGateway());
Container.set<IRepository<UserDto>>(UserRepository, new UserRepository(Container.get<IGateway>(ApiGateway)));
Container.set<IEventService>(EventService, new EventService(Container.get<IRepository<EventDto>>(EventInMemoryRepository)));
Container.set<IAuthService>(AuthService, new AuthService(Container.get<IGateway>(ApiGateway)));
Container.set<IUserService>(UserService, new UserService(Container.get<IRepository<UserDto>>(UserRepository)));
Container.set<GetEventsUseCase>(GetEventsUseCase, new GetEventsUseCase(Container.get<IEventService>(EventService)));
Container.set<CreateEventUseCase>(CreateEventUseCase, new CreateEventUseCase(Container.get<IEventService>(EventService)));
Container.set<LoginUseCase>(LoginUseCase, new LoginUseCase(Container.get<IAuthService>(AuthService)));
Container.set<RegistrationUseCase>(RegistrationUseCase, new RegistrationUseCase(Container.get<IUserService>(UserService)));
Container.set<GetUsersUseCase>(GetUsersUseCase, new GetUsersUseCase(Container.get<IUserService>(UserService)));
Container.set<ChangePasswordUseCase>(ChangePasswordUseCase, new ChangePasswordUseCase(Container.get<IAuthService>(AuthService)));

export const GetEventUseCaseImpl = Container.get<GetEventsUseCase>(GetEventsUseCase);
export const CreateEventUseCaseImpl = Container.get<CreateEventUseCase>(CreateEventUseCase);
export const LoginUseCaseImpl = Container.get<LoginUseCase>(LoginUseCase);
export const RegistrationUseCaseImpl = Container.get<RegistrationUseCase>(RegistrationUseCase);
export const GetUsersUseCaseImpl = Container.get<GetUsersUseCase>(GetUsersUseCase);
export const ChangePasswordUseCaseImpl = Container.get<ChangePasswordUseCase>(ChangePasswordUseCase);
