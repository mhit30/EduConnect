export interface IParentMessage {
  parentMessageId: string;
  title: string;
  body: string;
  status: string;
  studentFullName: {
    firstName: string;
    lastName: string;
  };
  grade: number;
  parentFullName: {
    firstName: string;
    lastName: string;
  };
}

export type ParentMessagesContextType = {
  parentMessages: IParentMessage[] | null;
  addParentMessages: (parentMessagesPayload: IParentMessage[]) => Promise<void>;
  getParentMessages: () => Promise<void>;
};

export type ParentMessagesActions = {
  type: "ADD_PARENT_MESSAGES";
  payload: IParentMessage[];
};
