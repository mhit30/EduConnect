import { Reducer } from "react";
import { ISchool, SchoolAction } from "@/types/SchoolContextTypes";
export const schoolReducer: Reducer<
  { school: ISchool | null },
  SchoolAction
> = (state, action) => {
  switch (action.type) {
    case "ADD_SCHOOL_INFO":
      return { ...state, school: action.payload };
    default:
      return state;
  }
};
