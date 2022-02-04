const isProduction = true;
export const path = isProduction
  ? "https://login-registration-postgres.herokuapp.com"
  : "http://localhost:4000";
