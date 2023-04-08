export interface IFacultyUser {
  accountHolderFullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  user_id: string;
}

export type FacultyUserAuthContextType = {
  isAuthenticated: boolean;
  facultyUser: IFacultyUser | null;
  facultyUserAuthRegister: (facultyUserPayload: IFacultyUser) => Promise<void>;
  facultyUserAuthLogin: (facultyUserPayload: IFacultyUser) => Promise<void>;
  getFacultyUserInfo: () => Promise<void>;
  facultyUserAuthLogout: () => void;
};

export type FacultyUserAuthAction =
  | { type: "FACULTY_REGISTER"; payload: IFacultyUser }
  | { type: "FACULTY_LOGIN"; payload: IFacultyUser }
  | { type: "FACULTY_LOGOUT" };
