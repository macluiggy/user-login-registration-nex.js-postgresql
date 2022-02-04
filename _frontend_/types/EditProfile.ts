// import { ChangeEvent } from "react";
// export type THandleChange = (
//   name: string
// ) => (event: ChangeEvent<HTMLTextAreaElement>) => void;

export type { THandleChange } from "../lib/types";
export type { UseStylesProps } from "./signup";
export { useStyles } from "./signup";

export type PropValues = {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: string;
  redirectToProfile: boolean;
  userId?: string;
};
