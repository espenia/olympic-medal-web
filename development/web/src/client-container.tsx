  // src/client-container
  'use client'
  import 'reflect-metadata'
  import { Container } from 'typedi'
  import GetEventsUseCase from '../../usecases/events/getEvents';
  import EventService from '../../infrastructure/src/events/eventService';
  import EventInMemoryRepository from '../../infrastructure/src/events/eventInMemoryRepository';
  import ApiGateway from '../../infrastructure/src/gateways/gateway';
  import UserService from '../../infrastructure/src/users/userService';
  import ClassificationService from '../../infrastructure/src/classifications/classificationService';
import CreateEventUseCase from '../../usecases/events/createEvent';
import IRepository from '../../entities/common/interfaces/repository';
import EventDto from '../../entities/events/event';
import IGateway from '../../infrastructure/src/interfaces/gateway';
import IEventService from '../../usecases/common/interfaces/eventService';
import LoginUseCase from '../../usecases/auth/loginUseCase';
import IUserService from '../../usecases/common/interfaces/userService';
import IClassificationService from '../../usecases/common/interfaces/classificationService';
import UserDto from '../../entities/users/user';
import UserRepository from '../../infrastructure/src/users/userRepository';
import IAuthService from '../../usecases/common/interfaces/authService';
import AuthService from '../../infrastructure/src/auth/authService';
import RegistrationUseCase from '../../usecases/auth/registrationUseCase';
import GetUsersUseCase from '../../usecases/users/getUsersUseCase';
import ChangePasswordUseCase from '../../usecases/auth/passwordChangeUseCase';
import GetClassificationUseCase from '../../usecases/classifications/getClassificationUseCase';
import EventClassifications from '../../entities/events/classifications';
import ClassificationRepository from '../../infrastructure/src/classifications/classificationRepository';
import AcceptClassificationUseCase from '../../usecases/classifications/acceptClassificationUseCase';
import DeclineClassificationUseCase from '../../usecases/classifications/declineClassificationUseCase';



Container.set<IRepository<EventDto>>(EventInMemoryRepository, new EventInMemoryRepository());
Container.set<IGateway>(ApiGateway, new ApiGateway());
Container.set<IRepository<UserDto>>(UserRepository, new UserRepository());
Container.set<IRepository<EventClassifications>>(ClassificationRepository, new ClassificationRepository());
Container.set<IEventService>(EventService, new EventService());
Container.set<IAuthService>(AuthService, new AuthService());
Container.set<IGateway>(ApiGateway, new ApiGateway());
Container.set<IUserService>(UserService, new UserService());
Container.set<IClassificationService>(ClassificationService, new ClassificationService());
Container.set<GetEventsUseCase>(GetEventsUseCase, new GetEventsUseCase(Container.get<IEventService>(EventService)));
Container.set<CreateEventUseCase>(CreateEventUseCase, new CreateEventUseCase(Container.get<IEventService>(EventService)));
Container.set<LoginUseCase>(LoginUseCase, new LoginUseCase(Container.get<IAuthService>(AuthService)));
Container.set<RegistrationUseCase>(RegistrationUseCase, new RegistrationUseCase(Container.get<IUserService>(UserService)));
Container.set<GetUsersUseCase>(GetUsersUseCase, new GetUsersUseCase(Container.get<IUserService>(UserService)));
Container.set<ChangePasswordUseCase>(ChangePasswordUseCase, new ChangePasswordUseCase(Container.get<IAuthService>(AuthService)));
Container.set<GetClassificationUseCase>(GetClassificationUseCase, new GetClassificationUseCase(Container.get<IClassificationService>(ClassificationService)));
Container.set<AcceptClassificationUseCase>(AcceptClassificationUseCase, new AcceptClassificationUseCase(Container.get<IClassificationService>(ClassificationService)));
Container.set<DeclineClassificationUseCase>(DeclineClassificationUseCase, new DeclineClassificationUseCase(Container.get<IClassificationService>(ClassificationService)));


const GetEventUseCaseImpl = Container.get<GetEventsUseCase>(GetEventsUseCase);
const CreateEventUseCaseImpl = Container.get<CreateEventUseCase>(CreateEventUseCase);
const LoginUseCaseImpl = Container.get<LoginUseCase>(LoginUseCase);
const RegistrationUseCaseImpl = Container.get<RegistrationUseCase>(RegistrationUseCase);
const GetUsersUseCaseImpl = Container.get<GetUsersUseCase>(GetUsersUseCase);
const ChangePasswordUseCaseImpl = Container.get<ChangePasswordUseCase>(ChangePasswordUseCase);
const GetClassificationUseCaseImpl = Container.get<GetClassificationUseCase>(GetClassificationUseCase);
const AcceptClassificationUseCaseImpl = Container.get<AcceptClassificationUseCase>(AcceptClassificationUseCase);
const DeclineClassificationUseCaseImpl = Container.get<DeclineClassificationUseCase>(DeclineClassificationUseCase);

export {
    GetEventUseCaseImpl,
    CreateEventUseCaseImpl,
    LoginUseCaseImpl,
    RegistrationUseCaseImpl,
    GetUsersUseCaseImpl,
    ChangePasswordUseCaseImpl,
    GetClassificationUseCaseImpl,
    AcceptClassificationUseCaseImpl,
    DeclineClassificationUseCaseImpl
}
