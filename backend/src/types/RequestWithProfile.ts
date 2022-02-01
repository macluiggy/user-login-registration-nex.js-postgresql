import { Request, NextFunction } from "express";
import { IUserDoc } from "../models/user.model";

// export interface RequestWithProfile extends Request {
//   profile?:
//     | (IUserDoc & {
//         _id: any;
//       })
//     | null;
// }
export interface RequestWithProfile extends Request {
  profile?: {
    _id: string;
    name: string;
    email: string;
    created: Date;
    updated?: Date | number;
    salt: string | undefined;
    hashed_password: string | undefined;
  } | null;
}
// export interface RequestHandlerWithProfile {
//   (RequestWithProfile, Response, NextFunction, id_: any): Promise<void>;
// }
