import { Reducer } from "react";
import {
  IFacultyUser,
  FacultyUserAuthAction,
} from "@/types/FacultyUserAuthContextTypes";

export const facultyUserAuthReducer: Reducer<
  { isAuthenticated: boolean; facultyUser: IFacultyUser | null },
  FacultyUserAuthAction
> = (state, action) => {
  switch (action.type) {
    case "FACULTY_REGISTER":
      return { ...state, isAuthenticated: true, facultyUser: action.payload };
    case "FACULTY_LOGIN":
      return { ...state, isAuthenticated: true, facultyUser: action.payload };
    case "FACULTY_LOGOUT":
      return { ...state, isAuthenticated: false, facultyUser: null };
    default:
      return state;
  }
};
