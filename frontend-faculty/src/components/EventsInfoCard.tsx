import React, { useContext, useEffect } from "react";
import { EventsContext } from "@/hooks/contexts/EventsContextProvider";
import { EventsContextType } from "@/types/EventsContextTypes";

export const EventsInfoCard: React.FC | any = () => {
  const { events, getEventsInfo } = useContext(
    EventsContext
  ) as EventsContextType;
  useEffect(() => {
    getEventsInfo();
  }, []); //! TOOK OUT event from array

  if (!events) {
    return;
  }
  if (Object.keys(events).length == 0) {
    return <h1>Loading...</h1>;
  }
  // handle obj
  const keysArr = Object.keys(events);
  const elementsArr = keysArr.map((key: any) => events[key]);

  return (
    <>
      <h1 className="text-xl font-bold text-custom_primary">Latest Events</h1>
      {elementsArr.map((index, key) => {
        return (
          <div
            key={key}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {index.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {index.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {index.eventDate.substring(0, 10)}
            </p>
            {index.eventType === "RSVP" ? (
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Current {index.eventType}s - {index.RSVPs.length}
              </p>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
