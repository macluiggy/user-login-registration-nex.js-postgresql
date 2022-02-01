import { SxProps } from "@mui/material";
export type UseStylesProps = {
  card: SxProps;
  error: SxProps;
  title: SxProps;
  textField: SxProps;
  submit: SxProps;
  cardActions: SxProps;
};
export const useStyles = (): UseStylesProps => ({
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "1rem",
    paddingBottom: "1rem",
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: "1rem",
    color: "black",
  },
  textField: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 300,
  },
  submit: {
    margin: "auto0",
    marginBottom: "1rem",
    textAlign: "center",
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
  },
});
