import { SxProps } from "@mui/material";
export type UserProps = {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: string;
};

export type UseStylesProps = {
  card: SxProps;
  error: SxProps;
  title: SxProps;
  textField: SxProps;
  submit: SxProps;
};

// export const useStyles = (): UseStylesProps => ({
//   card: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     textAlign: "center",
//     paddingBottom: "1rem",
//   },
//   error: {
//     verticalAlign: "middle",
//   },
//   title: {
//     marginTop: "1rem",
//     color: "black",
//   },
//   textField: {
//     marginTop: "1rem",
//     marginRight: "1rem",
//     width: 300,
//   },
//   submit: {
//     margin: "auto",
//     marginBottom: "1rem",
//   },
// });
export { useStyles } from "./signin";
