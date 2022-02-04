import { path } from "../config";
import { OnSignIn } from "./types";
// killall -9 node
const signin: OnSignIn = async (user) => {
  try {
    const response = await fetch(`${path}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const signout = async () => {
  try {
    const response = await fetch(`${path}/auth/signout`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { signin, signout };
