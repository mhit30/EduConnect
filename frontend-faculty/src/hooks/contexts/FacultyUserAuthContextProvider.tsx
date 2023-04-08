import { axiosClient } from "@/axiosClient";
import {
  FacultyUserAuthContextType,
  IFacultyUser,
} from "@/types/FacultyUserAuthContextTypes";
import React, { useReducer, createContext, useEffect } from "react";
import { facultyUserAuthReducer } from "../reducers/FacultyUserAuthReducer";

export const FacultyUserAuthContext = createContext<
  FacultyUserAuthContextType | undefined
>({
  isAuthenticated: false,
  facultyUser: null,
  facultyUserAuthRegister: async () => Promise.resolve(),
  facultyUserAuthLogin: async () => Promise.resolve(),
  facultyUserAuthLogout: () => {},
  getFacultyUserInfo: () => Promise.resolve(),
});

export const FacultyUserAuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(facultyUserAuthReducer, {
    isAuthenticated: false,
    facultyUser: null,
  });

  useEffect(() => {
    if (state.isAuthenticated) {
      getFacultyUserInfo();
    }
  }, []);

  const getFacultyUserInfo = async () => {
    await axiosClient
      .get("/v1/faculty/getMyFacultyUserInfo")
      .then((res) => {
        const { accountHolderFullName, email, user_id } = res.data;
        facultyUserAuthLogin({
          accountHolderFullName: accountHolderFullName,
          email: email,
          user_id: user_id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const facultyUserAuthRegister = async (facultyUserPayload: IFacultyUser) => {
    dispatch({
      type: "FACULTY_REGISTER",
      payload: { ...facultyUserPayload },
    });
  };
  const facultyUserAuthLogin = async (facultyUserPayload: IFacultyUser) => {
    dispatch({
      type: "FACULTY_LOGIN",
      payload: { ...facultyUserPayload },
    });
  };
  const facultyUserAuthLogout = async () => {
    dispatch({
      type: "FACULTY_LOGOUT",
    });
  };

  return (
    <FacultyUserAuthContext.Provider
      value={{
        facultyUserAuthRegister,
        facultyUserAuthLogin,
        facultyUserAuthLogout,
        getFacultyUserInfo,
        isAuthenticated: state.isAuthenticated,
        facultyUser: state.facultyUser,
      }}
    >
      {children}
    </FacultyUserAuthContext.Provider>
  );
};
