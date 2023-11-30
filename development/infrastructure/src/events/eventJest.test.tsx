import GetEventsUseCase from '../../../usecases/events/getEvents';
import CommentEventUseCase from '../../../usecases/events/commentEvent';
import EventDto from '../../../entities/events/event';
import CreateEventUseCase from '../../../usecases/events/createEvent';
import EventCommentDto from '../../../entities/events/comment';
import { Container } from 'typedi';
import IEventService from '../../../usecases/common/interfaces/eventService';
import EventService from './eventService';
import EventInMemoryRepository from './eventInMemoryRepository';

describe('events use cases', () => {
  test('events repository should be initialized empty', async () => {
    const req = new GetEventsUseCase(new EventService(new EventInMemoryRepository()));
    const events = await req.handle();
    expect(events.length).toBe(0);
  });
});

describe('events use cases', () => {
  test('leaving a valid comment in an event should keep it', async () => {
    const repo = new EventInMemoryRepository();
    const req = new CreateEventUseCase(new EventService(repo));
    const event = new EventDto();
    event.comments = [];
    event.name = "prueba";
    req.event = event;
    await req.handle();

    const req2 = new GetEventsUseCase(new EventService(repo));
    req2.name = event.name;
    const event2 = await req2.handle();

    const usecase = new CommentEventUseCase(new EventService(repo));
    usecase.comment = new EventCommentDto();
    usecase.comment.eventId = event2.at(0)!.id;
    usecase.comment.content = "Un comentario de prueba";
    await usecase.handle();

    const event3 = new GetEventsUseCase(new EventService(repo));
    event3.id = event2.at(0)!.id;

    const events = await event3.handle();
    const commentedEvent = events.at(0);
    
    expect(commentedEvent!.comments!.some(x => x.content === usecase.comment?.content)).toBe(true);
  });
});