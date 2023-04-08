import React, { useReducer, createContext, useEffect } from "react";
import { axiosClient } from "@/axiosClient";
import { ISchool, SchoolContextType } from "@/types/SchoolContextTypes";
import { schoolReducer } from "../reducers/SchoolReducer";
import { getFacultyUserJWTToken } from "../../../utils/localStorage";

export const SchoolContext = createContext<SchoolContextType | undefined>({
  school: null,
  addSchoolInfo: async () => Promise.resolve(),
  getSchoolInfo: async () => Promise.resolve(),
});

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(schoolReducer, { school: null });

  useEffect(() => {
    getSchoolInfo();
  }, []);
  const getSchoolInfo = async () => {
    await axiosClient
      .get("/v1/faculty/getSchoolInfo")
      .then((res) => {
        const { name, address, joinCode } = res.data;
        addSchoolInfo({ name, address, joinCode });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSchoolInfo = async (schoolInfoPayload: ISchool) => {
    dispatch({
      type: "ADD_SCHOOL_INFO",
      payload: { ...schoolInfoPayload },
    });
  };

  return (
    <SchoolContext.Provider
      value={{ addSchoolInfo, getSchoolInfo, school: state.school }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
