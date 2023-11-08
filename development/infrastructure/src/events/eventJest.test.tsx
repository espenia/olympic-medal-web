import GetEventsUseCase from '../../../usecases/events/getEvents';
import CommentEventUseCase from '../../../usecases/events/commentEvent';
import { randomUUID } from 'crypto';
import EventDto from '../../../entities/events/event';
import CreateEventUseCase from '../../../usecases/events/createEvent';
import EventCommentDto from '../../../entities/events/comment';
import { Container } from 'typedi';
import IEventService from '../../../usecases/common/interfaces/eventService';
import EventService from './eventService';

describe('events use cases', () => {
  test('events repository should be initialized empty', async () => {
    EventService;
    const req = new GetEventsUseCase(Container.get<IEventService>('eventservice'));
    const events = await req.handle();
    expect(events.length).toBe(0);
  });
});

describe('events use cases', () => {
  test('leaving a valid comment in an event should keep it', async () => {
    const req = new CreateEventUseCase(Container.get<IEventService>('eventservice'));
    const eventId = randomUUID();
    const event = new EventDto();
    event.id = eventId;
    req.event = event;
    await req.handle();

    const usecase = new CommentEventUseCase(Container.get<IEventService>('eventservice'));
    usecase.comment = new EventCommentDto();
    usecase.comment.eventId = eventId;
    usecase.comment.content = "Un comentario de prueba";
    await usecase.handle();

    const event2 = new GetEventsUseCase(Container.get<IEventService>('eventservice'));
    event2.id = eventId;

    const events = await event2.handle();
    const commentedEvent = events.at(0);
    
    expect(commentedEvent!.comments!.some(x => x.content === usecase.comment?.content)).toBe(true);
  });
});