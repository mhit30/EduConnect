import { SchoolContext } from "@/hooks/contexts/SchoolContextProvider";
import { SchoolContextType } from "@/types/SchoolContextTypes";
import React, { useContext } from "react";

export const SchoolInfoCard: React.FC = () => {
  const { school } = useContext(SchoolContext) as SchoolContextType;
  return (
    <>
      <h1>{school?.name}</h1>
      <h2>Join Code: {school?.joinCode}</h2>
      <p>
        Address: {school?.address.city}, {school?.address.country}
      </p>
    </>
  );
};
