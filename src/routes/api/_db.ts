import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

interface Session {
  id: string;
  email: string;
}
interface User {
  email: string;
  password: string;
}

const usersRaw: User[] = JSON.parse(import.meta.env.VITE_USERS);
const users: User[] = [];
let sessions: Session[] = [];

const saltRounds = 10;

export const initilizeDb = () => {
  try {
    usersRaw.forEach(registerUser);
  } catch (e) {
    console.log("errro");
    console.log(e);
  }
  return Promise.resolve();
};

export const getUser = async ({ email, password }: User) => {
  const existingUser = users.find((user) => user.email === email);
  if (!existingUser) return Promise.resolve(null);

  return new Promise((resolve) =>
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (result) {
        resolve(existingUser);
      } else {
        resolve(null);
      }
    })
  );
};

export const registerUser = async (user: User) => {
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) return Promise.reject(new Error("User already exists"));

  const newUser: User = { email: user.email, password: "" };
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    newUser.password = hash;
    users.push(newUser);
    return Promise.resolve(newUser);
  });
};

export const createSession = (email: string) => {
  const session = {
    id: uuidv4(),
    email
  };
  sessions.push(session);
  return Promise.resolve(session);
};

export const getSession = (id: string) => {
  const session = sessions.find((session) => session.id === id);
  if (!session) return Promise.resolve(null);
  return Promise.resolve(session);
};

export const removeSession = (id: string) => {
  const session = sessions.find((session) => session.id === id);
  if (!session) return Promise.reject(new Error("Session not found"));
  sessions = sessions.filter((session) => session.id !== id);
  return Promise.resolve(session);
};
