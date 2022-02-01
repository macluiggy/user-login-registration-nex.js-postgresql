import { ChangeEvent } from "react";
export type TCreate = (user: {
  name: string;
  email: string;
  password: string | number;
}) => Promise<{
  message: string;
  newUser: {
    name: string;
    email: string;
    _id: string;
    created: Date | string;
  };
  error?: any;
}>;

export type TList = (signal: AbortSignal) =>
  | Promise<
      {
        _id: string;
        name: string;
        email: string;
        created: Date | string;
        updated?: Date | string;
        error?: any;
      }[]
    >
  | { error: any };

export type TRead = (
  params: { userId: string },
  credentials: { t: string | boolean },
  signal?: AbortSignal
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: string;
  error?: any;
}>;

export type TUpdate = (
  params: { userId: string },
  credentials: { t: string },
  user: {
    name: string;
    email: string;
    password: string;
  }
) => Promise<{
  _id: string;
  name: string;
  email: string;
  created: Date | undefined;
  updated: Date | undefined;
  error?: any;
}>;

export type TRemove = (
  params: { userId: string },
  credentials: { t: string }
) => Promise<{
  message: string;
  deletedUser: {
    _id: string;
    name: string;
    email: string;
    created: string;
  };
  error?: any;
}>;
export type THandleChange = (
  name: string
) => (event: ChangeEvent<HTMLTextAreaElement>) => void;

export type iUserSignIn = {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    created: Date;
  };
  error?: string;
};
/*
the result of sing up
{
	"message": "Successfully signed up!",
	"newUser": {
		"name": "test2",
		"email": "test2@gmail.com",
		"_id": "61f15aa14f444b7df44a7eeb",
		"created": "2022-01-26T14:28:49.485Z",
		"__v": 0
	}
}
*/

export type OnSignIn = (user: { email: string; password: string }) => Promise<{
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    created: Date;
  };
  error?: string;
}>;
