export class ChurchInfo {
    id: any;
    name: any;
    Details : LiturgicalCalendar[]
}

export class LiturgicalCalendar {
    id: any;
    date: any;
    startTime: any;
    endTime: any;
    availableSeats: any;
}