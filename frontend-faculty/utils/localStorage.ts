export const storeFacultyUserJWTToken = (jwtToken: string) => {
  // code from Ibrahim Adeniyi https://dev.to/dendekky/accessing-localstorage-in-nextjs-39he
  if (typeof window !== "undefined") {
    localStorage.setItem("facultyUserJWTToken", jwtToken);
  }
};

export const getFacultyUserJWTToken = () => {
  if (typeof window !== "undefined") {
    localStorage.getItem("facultyUserJWTToken");
  }
};
