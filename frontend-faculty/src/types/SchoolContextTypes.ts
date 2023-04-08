export interface ISchool {
  name: String;
  address: {
    street: String;
    city: String;
    zip: String;
    state: String;
    country: String;
  };
  joinCode: String;
}

export type SchoolContextType = {
  school: ISchool | null;
  addSchoolInfo: (schoolInfoPayload: ISchool) => Promise<void>;
  getSchoolInfo: () => Promise<void>;
};

export type SchoolAction = { type: "ADD_SCHOOL_INFO"; payload: ISchool };
