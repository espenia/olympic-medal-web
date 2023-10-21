import EventInMemoryRepository from './eventInMemoryRepository';
import EventService from './eventService';
import GetEventsUseCase from '../../../usecases/events/getEvents';
import CommentEventUseCase from '../../../usecases/events/commentEvent';
import { randomUUID } from 'crypto';
import EventDto from '../../../entities/events/event';

describe('events use cases', () => {
  test('events repository should be initialized empty', async () => {
    var usecase = new GetEventsUseCase(new EventService(new EventInMemoryRepository()));
    var events = await usecase.handle();
    expect(events.length).toBe(0);
  });
});

describe('events use cases', () => {
  test('leaving a valid comment in an event should keep it', async () => {
    var events = new EventInMemoryRepository();
    var service = new EventService(events);
    var eventId = randomUUID();
    var event = new EventDto();
    event.id = eventId;
    events.createAsync(event);

    var usecase = new CommentEventUseCase(service);
    usecase.eventId = eventId;
    usecase.comment = "Un comentario de prueba";

    await usecase.handle();

    var commentedEvent = await service.getEventAsync(eventId);
    
    expect(commentedEvent.comments.some(x => x.content === usecase.comment)).toBe(true);
  });
});