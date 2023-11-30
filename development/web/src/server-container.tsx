  // src/server-container
  import 'reflect-metadata'
  import { Container } from 'typedi'
import GetEventsUseCase from '../../usecases/events/getEvents';
import EventService from '../../infrastructure/src/events/eventService';
import ApiGateway from '../../infrastructure/src/gateways/gateway';
import UserService from '../../infrastructure/src/users/userService';
import CreateEventUseCase from '../../usecases/events/createEvent';
import IRepository from '../../entities/common/interfaces/repository';
import EventDto from '../../entities/events/event';
import IEventService from '../../usecases/common/interfaces/eventService';
import IGateway from '../../infrastructure/src/interfaces/gateway';
import EventRepository from '../../infrastructure/src/events/eventRepository';
import UserDto from '../../entities/users/user';
import AuthService from '../../infrastructure/src/auth/authService';
import UserRepository from '../../infrastructure/src/users/userRepository';
import LoginUseCase from '../../usecases/auth/loginUseCase';
import RegistrationUseCase from '../../usecases/auth/registrationUseCase';
import IAuthService from '../../usecases/common/interfaces/authService';
import IUserService from '../../usecases/common/interfaces/userService';
import GetUsersUseCase from '../../usecases/users/getUsersUseCase';
import ChangePasswordUseCase from '../../usecases/auth/passwordChangeUseCase';
import PasswordRecoverUseCase from '../../usecases/auth/passwordRecoverUseCase';

!Container.has('apigateway') && Container.set<ApiGateway>({ id: 'apigateway', transient: false, global: true, eager: true, multiple: false, value: new ApiGateway() });
!Container.has(EventService) && Container.set<IRepository<EventDto>>(EventRepository, new EventRepository(Container.get<ApiGateway>('apigateway')));
!Container.has(UserRepository) && Container.set<IRepository<UserDto>>(UserRepository, new UserRepository(Container.get<ApiGateway>('apigateway')));
!Container.has(EventService) && Container.set<IEventService>(EventService, new EventService(Container.get<IRepository<EventDto>>(EventRepository)));
!Container.has(AuthService) && Container.set<IAuthService>(AuthService, new AuthService(Container.get<ApiGateway>('apigateway')));
!Container.has(UserService) && Container.set<IUserService>(UserService, new UserService(Container.get<IRepository<UserDto>>(UserRepository)));
!Container.has(GetEventsUseCase) && Container.set<GetEventsUseCase>(GetEventsUseCase, new GetEventsUseCase(Container.get<IEventService>(EventService)));
!Container.has(CreateEventUseCase) && Container.set<CreateEventUseCase>(CreateEventUseCase, new CreateEventUseCase(Container.get<IEventService>(EventService)));
!Container.has(LoginUseCase) && Container.set<LoginUseCase>(LoginUseCase, new LoginUseCase(Container.get<IAuthService>(AuthService)));
!Container.has(RegistrationUseCase) && Container.set<RegistrationUseCase>(RegistrationUseCase, new RegistrationUseCase(Container.get<IUserService>(UserService)));
!Container.has(GetUsersUseCase) && Container.set<GetUsersUseCase>(GetUsersUseCase, new GetUsersUseCase(Container.get<IUserService>(UserService)));
!Container.has(ChangePasswordUseCase) && Container.set<ChangePasswordUseCase>(ChangePasswordUseCase, new ChangePasswordUseCase(Container.get<IAuthService>(AuthService)));
!Container.has(PasswordRecoverUseCase) && Container.set<PasswordRecoverUseCase>(PasswordRecoverUseCase, new PasswordRecoverUseCase(Container.get<IAuthService>(AuthService)));

const GetEventUseCaseImpl = Container.get<GetEventsUseCase>(GetEventsUseCase);
const CreateEventUseCaseImpl = Container.get<CreateEventUseCase>(CreateEventUseCase);
const LoginUseCaseImpl = Container.get<LoginUseCase>(LoginUseCase);
const RegistrationUseCaseImpl = Container.get<RegistrationUseCase>(RegistrationUseCase);
const GetUsersUseCaseImpl = Container.get<GetUsersUseCase>(GetUsersUseCase);
const ChangePasswordUseCaseImpl = Container.get<ChangePasswordUseCase>(ChangePasswordUseCase);
const PasswordRecoverUseCaseImpl = Container.get<PasswordRecoverUseCase>(PasswordRecoverUseCase);

export {
    GetEventUseCaseImpl,
    CreateEventUseCaseImpl,
    LoginUseCaseImpl,
    RegistrationUseCaseImpl,
    GetUsersUseCaseImpl,
    ChangePasswordUseCaseImpl,
    PasswordRecoverUseCaseImpl
}
