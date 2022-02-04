import { SxProps, Theme } from "@mui/material";

export type UseStylesProps = {
  root: SxProps<Theme>;
  title: SxProps<Theme>;
};

export type UserProps = {
  _id: string;
  name: string;
  email: string;
  created: Date | string;
  updated?: Date | string;
};
