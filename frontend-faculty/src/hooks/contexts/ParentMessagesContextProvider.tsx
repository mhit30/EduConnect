import React, { useReducer, createContext, useEffect } from "react";
import { axiosClient } from "@/axiosClient";
import {
  ParentMessagesContextType,
  IParentMessage,
} from "@/types/ParentMessagesContextTypes";
import { parentMessagesReducer } from "../reducers/ParentMessagesReducer";

export const ParentMessagesContext = createContext<
  ParentMessagesContextType | undefined
>({
  parentMessages: null,
  addParentMessages: async () => Promise.resolve(),
  getParentMessages: async () => Promise.resolve(),
});

export const ParentMessagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(parentMessagesReducer, {
    parentMessages: null,
  });

  useEffect(() => {
    getParentMessages();
  }, []);

  const getParentMessages = async () => {
    await axiosClient
      .get("/v1/parentMessages/getParentMessages")
      .then((res) => {
        addParentMessages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addParentMessages = async (parentMessagesPayload: IParentMessage[]) => {
    dispatch({
      type: "ADD_PARENT_MESSAGES",
      payload: { ...parentMessagesPayload },
    });
  };

  return (
    <ParentMessagesContext.Provider
      value={{
        getParentMessages,
        addParentMessages,
        parentMessages: state.parentMessages,
      }}
    >
      {children}
    </ParentMessagesContext.Provider>
  );
};
