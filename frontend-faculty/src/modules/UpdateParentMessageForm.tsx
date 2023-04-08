import { axiosClient } from "@/axiosClient";
import { ParentMessagesContext } from "@/hooks/contexts/ParentMessagesContextProvider";
import { ParentMessagesContextType } from "@/types/ParentMessagesContextTypes";
import React, { useContext } from "react";

interface IUpdateParentMessageForm {
  parentMessageId: string;
}
export const UpdateParentMessageForm: React.FC<IUpdateParentMessageForm> = ({
  parentMessageId,
}) => {
  const { getParentMessages } = useContext(
    ParentMessagesContext
  ) as ParentMessagesContextType;

  const handleSubmit = async () => {
    await axiosClient
      .post("/v1/parentMessages/updateParentMessage", {
        parentMessageStatus: "resolved", //! HARD CODED RESOLVE
        parentMessageId: parentMessageId,
      })
      .then((res) => {
        getParentMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="mt-4 inline-block rounded border border-green-500 bg-green-500 py-4 px-4"
      >
        Resolve
      </button>
    </>
  );
};
