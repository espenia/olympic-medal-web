  // src/server-container
  import 'reflect-metadata'
  import { Container } from 'typedi'
import GetEventsUseCase from '../../usecases/events/getEvents';
import EventService from '../../infrastructure/src/events/eventService';
import EventRepository from '../../infrastructure/src/events/eventRepository';
import ApiGateway from '../../infrastructure/src/gateways/gateway';
import UserService from '../../infrastructure/src/users/userService';
import CreateEventUseCase from '../../usecases/events/createEvent';
import IRepository from '../../entities/common/interfaces/repository';
import EventDto from '../../entities/events/event';
import IEventService from '../../usecases/common/interfaces/eventService';
import IGateway from '../../infrastructure/src/interfaces/gateway';
import UserDto from '../../entities/users/user';
import AuthService from '../../infrastructure/src/auth/authService';
import UserRepository from '../../infrastructure/src/users/userRepository';
import LoginUseCase from '../../usecases/auth/loginUseCase';
import RegistrationUseCase from '../../usecases/auth/registrationUseCase';
import PasswordRecoverUseCase from '../../usecases/auth/passwordRecoverUseCase';
import PasswordChangeUseCase from '../../usecases/auth/passwordChangeUseCase';
import IAuthService from '../../usecases/common/interfaces/authService';
import IUserService from '../../usecases/common/interfaces/userService';

!Container.has('apigateway') && Container.set<ApiGateway>({ id: 'apigateway', transient: false, global: true, eager: true, multiple: false, value: new ApiGateway() });
Container.set<IRepository<EventDto>>(EventRepository, new EventRepository(Container.get<IGateway>('apigateway')));
Container.set<IRepository<UserDto>>(UserRepository, new UserRepository(Container.get<IGateway>('apigateway')));
Container.set<IEventService>(EventService, new EventService(Container.get<IRepository<EventDto>>(EventRepository)));
Container.set<IAuthService>(AuthService, new AuthService(Container.get<IGateway>('apigateway')));
Container.set<IUserService>(UserService, new UserService(Container.get<IRepository<UserDto>>(UserRepository)));
Container.set<GetEventsUseCase>(GetEventsUseCase, new GetEventsUseCase(Container.get<IEventService>(EventService)));
Container.set<CreateEventUseCase>(CreateEventUseCase, new CreateEventUseCase(Container.get<IEventService>(EventService)));
Container.set<LoginUseCase>(LoginUseCase, new LoginUseCase(Container.get<IAuthService>(AuthService)));
Container.set<RegistrationUseCase>(RegistrationUseCase, new RegistrationUseCase(Container.get<IUserService>(UserService)));
Container.set<PasswordRecoverUseCase>(PasswordRecoverUseCase, new PasswordRecoverUseCase(Container.get<IAuthService>(AuthService)));
Container.set<PasswordChangeUseCase>(PasswordChangeUseCase, new PasswordChangeUseCase(Container.get<IAuthService>(AuthService)));

const GetEventUseCaseImpl = Container.get<GetEventsUseCase>(GetEventsUseCase);
const CreateEventUseCaseImpl = Container.get<CreateEventUseCase>(CreateEventUseCase);
const LoginUseCaseImpl = Container.get<LoginUseCase>(LoginUseCase);
const RegistrationUseCaseImpl = Container.get<RegistrationUseCase>(RegistrationUseCase);
const PasswordRecoverUseCaseImpl = Container.get<PasswordRecoverUseCase>(PasswordRecoverUseCase);
const PasswordChangeUseCaseImpl = Container.get<PasswordChangeUseCase>(PasswordChangeUseCase);

export {
    GetEventUseCaseImpl,
    CreateEventUseCaseImpl,
    LoginUseCaseImpl,
    RegistrationUseCaseImpl,
    PasswordRecoverUseCaseImpl,
    PasswordChangeUseCaseImpl
}
