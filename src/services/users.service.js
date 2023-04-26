import Users from "../dao/dbManagers/users.js";
import { isAdmin } from "../lib/validators/validator.js";
import { createHash } from "../utils.js";

const userManager = new Users();

export const getUserByEmail = async (email) => userManager.findByEmail(email);

export const getUserByCode = async (code_technical) =>
  userManager.findByCode(code_technical);

export const register = async (
  email,
  password,
  code_technical,
  first_name,
  last_name
) => {
  const newUser = {
    email,
    password: createHash(password),
    code_technical,
    first_name,
    last_name,
    role: "user",
  };

  return await userManager.create(newUser);
};

export const login = async (user, password) => {
  if (isAdmin(user.email, password)) {
    user.role = "admin";
  }

  user.password = "";

  return user;
};
