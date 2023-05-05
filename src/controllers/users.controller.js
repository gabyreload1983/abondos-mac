import config from "../config/config.js";
import { incompleteValues } from "../lib/validators/validator.js";
import { generateToken, validatePassword } from "../utils.js";
import * as userService from "../services/users.service.js";

const register = async (req, res) => {
  try {
    const { email, password, code_technical, first_name, last_name } = req.body;

    if (
      incompleteValues(email, password, code_technical, first_name, last_name)
    )
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const user = await userService.getUserByEmail(email);
    if (user)
      return res
        .status(400)
        .send({ status: "error", message: "User email already exists!" });

    const userCode = await userService.getUserByCode(code_technical);
    if (userCode)
      return res
        .status(400)
        .send({ status: "error", message: "User Code already exists!" });

    await userService.register(
      email,
      password,
      code_technical,
      first_name,
      last_name
    );

    res.send({ status: "success", message: "user registered" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (incompleteValues(email, password))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid credentials" });

    if (!validatePassword(user, password))
      return res
        .status(400)
        .send({ status: "error", message: "Invalid credentials" });

    const response = await userService.login(user);

    const accessToken = generateToken(response);

    res
      .cookie(config.cookie_name, accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .send({ status: "success", message: "login success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const logout = (req, res) => {
  res.clearCookie(config.cookie_name);
  res.redirect("/login");
};

export { register, login, logout };
