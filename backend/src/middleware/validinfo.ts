import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  console.log(req.path);
  function validEmail(userEmail: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path.match(/\/users\/?/g)) {
    // if the path is register
    console.log(email);
    if (![email, name, password].every(Boolean)) {
      // if the email, name and password are not all filled
      return res.json({ error: "Missing credential(s)" }); // 401 means unauthenticated
    } else if (!validEmail(email)) {
      // if the email is not valid
      return res.status(401).json({ error: "Invalid email" }); // return invalid email
    }
  } else if (req.path.match(/\/auth\/signin\/?/g)) {
    console.log("estamos en auth signin");
    // if the path is login
    if (![email, password].every(Boolean)) {
      // if the email and password are not all filled
      return res.json({ error: "Missing credentials" }); // 401 means unauthenticated
    } else if (!validEmail(email)) {
      // if the email is not valid
      return res.status(401).json({ error: "Invalid email" }); // return invalid email
    }
  }

  next();
};
