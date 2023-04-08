export interface IEvent {
  _id: string;
  name: String;
  description: String;
  eventType: String;
  eventDate: Date | any;
  RSVPs: String[];
  school: String[];
  eventCreator: String;
}

export type EventsContextType = {
  events: IEvent[] | null;
  addEventsInfo: (eventsInfoPayload: IEvent[]) => Promise<void>;
  getEventsInfo: () => Promise<void>;
};

export type EventsAction = { type: "ADD_EVENTS_INFO"; payload: IEvent[] };
