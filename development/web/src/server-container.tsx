  // src/server-container
  import 'reflect-metadata'
  import { Container } from 'typedi'
import GetEventsUseCase from '../../usecases/events/getEvents';
import EventService from '../../infrastructure/src/events/eventService';
import ApiGateway from '../../infrastructure/src/gateways/gateway';
import UserService from '../../infrastructure/src/users/userService';
import CreateEventUseCase from '../../usecases/events/createEvent';
import IRepository from '../../entities/common/interfaces/repository';
import ClassificationService from '../../infrastructure/src/classifications/classificationService';
import IClassificationService from '../../usecases/common/interfaces/classificationService';
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
import GetUserUseCase from '../../usecases/users/getUserUseCase';
import ChangePasswordUseCase from '../../usecases/auth/passwordChangeUseCase';
import PasswordRecoverUseCase from '../../usecases/auth/passwordRecoverUseCase';
import GetClassificationUseCase from '../../usecases/classifications/getClassificationUseCase';
import ClassificationRepository from '../../infrastructure/src/classifications/classificationRepository';
import AcceptClassificationUseCase from '../../usecases/classifications/acceptClassificationUseCase';
import DeclineClassificationUseCase from '../../usecases/classifications/declineClassificationUseCase';
  import EventClassificationDto from "../../entities/events/classifications";

!Container.has('apigateway') && Container.set<ApiGateway>({ id: 'apigateway', transient: false, global: true, eager: true, multiple: false, value: new ApiGateway() });
!Container.has(EventService) && Container.set<IRepository<EventDto>>(EventRepository, new EventRepository(Container.get<ApiGateway>('apigateway')));
!Container.has(UserRepository) && Container.set<IRepository<UserDto>>(UserRepository, new UserRepository(Container.get<ApiGateway>('apigateway')));
!Container.has(ClassificationRepository) && Container.set<IRepository<EventClassificationDto>>(ClassificationRepository, new ClassificationRepository(Container.get<ApiGateway>('apigateway')));
!Container.has(EventService) && Container.set<IEventService>(EventService, new EventService(Container.get<IRepository<EventDto>>(EventRepository)));
!Container.has(AuthService) && Container.set<IAuthService>(AuthService, new AuthService(Container.get<ApiGateway>('apigateway')));
!Container.has(UserService) && Container.set<IUserService>(UserService, new UserService(Container.get<IRepository<UserDto>>(UserRepository)));
!Container.has(ClassificationService) && Container.set<IClassificationService>(ClassificationService, new ClassificationService(Container.get<IRepository<EventClassificationDto>>(ClassificationRepository)));
!Container.has(GetEventsUseCase) && Container.set<GetEventsUseCase>(GetEventsUseCase, new GetEventsUseCase(Container.get<IEventService>(EventService)));
!Container.has(CreateEventUseCase) && Container.set<CreateEventUseCase>(CreateEventUseCase, new CreateEventUseCase(Container.get<IEventService>(EventService)));
!Container.has(LoginUseCase) && Container.set<LoginUseCase>(LoginUseCase, new LoginUseCase(Container.get<IAuthService>(AuthService)));
!Container.has(RegistrationUseCase) && Container.set<RegistrationUseCase>(RegistrationUseCase, new RegistrationUseCase(Container.get<IUserService>(UserService)));
!Container.has(GetUsersUseCase) && Container.set<GetUsersUseCase>(GetUsersUseCase, new GetUsersUseCase(Container.get<IUserService>(UserService)));
!Container.has(GetUserUseCase) && Container.set<GetUserUseCase>(GetUserUseCase, new GetUserUseCase(Container.get<IUserService>(UserService)));

!Container.has(ChangePasswordUseCase) && Container.set<ChangePasswordUseCase>(ChangePasswordUseCase, new ChangePasswordUseCase(Container.get<IAuthService>(AuthService)));
!Container.has(PasswordRecoverUseCase) && Container.set<PasswordRecoverUseCase>(PasswordRecoverUseCase, new PasswordRecoverUseCase(Container.get<IAuthService>(AuthService)));
!Container.has(DeclineClassificationUseCase) && Container.set<DeclineClassificationUseCase>(DeclineClassificationUseCase, new DeclineClassificationUseCase(Container.get<IClassificationService>(ClassificationService)));
!Container.has(AcceptClassificationUseCase) && Container.set<AcceptClassificationUseCase>(AcceptClassificationUseCase, new AcceptClassificationUseCase(Container.get<IClassificationService>(ClassificationService)));
!Container.has(GetClassificationUseCase) && Container.set<GetClassificationUseCase>(GetClassificationUseCase, new GetClassificationUseCase(Container.get<IClassificationService>(ClassificationService)));


const GetEventUseCaseImpl = Container.get<GetEventsUseCase>(GetEventsUseCase);
const CreateEventUseCaseImpl = Container.get<CreateEventUseCase>(CreateEventUseCase);
const LoginUseCaseImpl = Container.get<LoginUseCase>(LoginUseCase);
const RegistrationUseCaseImpl = Container.get<RegistrationUseCase>(RegistrationUseCase);
const GetUsersUseCaseImpl = Container.get<GetUsersUseCase>(GetUsersUseCase);
const GetUserUseCaseImpl = Container.get<GetUserUseCase>(GetUserUseCase);
const ChangePasswordUseCaseImpl = Container.get<ChangePasswordUseCase>(ChangePasswordUseCase);
const PasswordRecoverUseCaseImpl = Container.get<PasswordRecoverUseCase>(PasswordRecoverUseCase);
const GetClassificationUseCaseImpl = Container.get<GetClassificationUseCase>(GetClassificationUseCase);
const AcceptClassificationUseCaseImpl = Container.get<AcceptClassificationUseCase>(AcceptClassificationUseCase);
const DeclineClassificationUseCaseImpl = Container.get<DeclineClassificationUseCase>(DeclineClassificationUseCase);

export {
    GetEventUseCaseImpl,
    CreateEventUseCaseImpl,
    LoginUseCaseImpl,
    RegistrationUseCaseImpl,
    GetUsersUseCaseImpl,
    GetUserUseCaseImpl,
    ChangePasswordUseCaseImpl,
    PasswordRecoverUseCaseImpl,
    GetClassificationUseCaseImpl,
    AcceptClassificationUseCaseImpl,
    DeclineClassificationUseCaseImpl
}
