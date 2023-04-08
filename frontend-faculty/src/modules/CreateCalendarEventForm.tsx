import { axiosClient } from "@/axiosClient";
import { EventsContext } from "@/hooks/contexts/EventsContextProvider";
import { EventsContextType } from "@/types/EventsContextTypes";
import React, { useState, useContext } from "react";

export const CreateCalendarEventForm: React.FC = () => {
  const { getEventsInfo } = useContext(EventsContext) as EventsContextType;
  const [name, setName] = useState<String | null>("");
  const [description, setDescription] = useState<String | null>("");
  const [eventType, setEventType] = useState<String | null>("");
  const [eventDate, setEventDate] = useState<any | null>(null);
  const handleSubmit = async () => {
    await axiosClient
      .post("/v1/calendar/createEvent", {
        name: name,
        description: description,
        eventType: eventType, // !CHANGE LATER TO ACTUAL TYPE
        eventDate: eventDate,
      })
      .then((res) => {
        getEventsInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <input
        type="text"
        id="name"
        placeholder="Event name"
        className="w-full rounded-md border-custom_secondary-500 border-2 shadow-sm mt-4"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="description"
        placeholder="Set description"
        className="w-full rounded-md border-custom_secondary-500 border-2 shadow-sm mt-4"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="radio"
        value="RSVP"
        id="RSVP"
        onChange={(e) => setEventType(e.target.value)}
      />
      <label htmlFor="RSVP" className="ml-2 mr-4">
        RSVP Event
      </label>

      <input
        type="date"
        id="eventDate"
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="ml-4 mt-4 inline-block rounded border border-custom_secondary-500 font-medium px-12 py-4 text-white bg-custom_secondary-500"
      >
        Create
      </button>
    </>
  );
};
