export default class EventResultItemDto {
    hours?: number;
    minutes?: number;
    seconds: number;

    /**
     *
     */
    constructor(hours: number | undefined = undefined, minutes: number | undefined = undefined, seconds: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
}