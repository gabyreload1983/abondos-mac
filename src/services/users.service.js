import UsersDto from "../dao/DTOs/users.dto.js";
import Users from "../dao/dbManagers/users.js";
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
  };

  return await userManager.create(newUser);
};

export const login = async (user) => {
  return new UsersDto(user);
};
