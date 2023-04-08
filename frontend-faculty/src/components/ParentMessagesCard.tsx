import React, { useContext, useEffect } from "react";
import { EventsContext } from "@/hooks/contexts/EventsContextProvider";
import { EventsContextType } from "@/types/EventsContextTypes";
import { ParentMessagesContext } from "@/hooks/contexts/ParentMessagesContextProvider";
import { ParentMessagesContextType } from "@/types/ParentMessagesContextTypes";
import { UpdateParentMessageForm } from "@/modules/UpdateParentMessageForm";

export const ParentMessagesCard: React.FC | any = () => {
  const { parentMessages, getParentMessages } = useContext(
    ParentMessagesContext
  ) as ParentMessagesContextType;
  useEffect(() => {
    getParentMessages();
  }, []);

  if (!parentMessages) {
    return;
  }
  if (Object.keys(parentMessages).length == 0) {
    return <h1>No messages!</h1>;
  }
  // handle obj
  const keysArr = Object.keys(parentMessages);
  const elementsArr = keysArr.map((key: any) => parentMessages[key]);

  return (
    <>
      {elementsArr.map((index, key) => {
        return (
          <div
            key={key}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Name: {index.studentFullName.firstName}{" "}
              {index.studentFullName.lastName} || Grade: {index.grade}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Title: {index.title}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Body: {index.body}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Grade: {index.grade}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Parent: {index.parentFullName.firstName}{" "}
              {index.parentFullName.lastName}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Status: {index.status}
            </p>
            <UpdateParentMessageForm parentMessageId={index.parentMessageId} />
          </div>
        );
      })}
    </>
  );
};
