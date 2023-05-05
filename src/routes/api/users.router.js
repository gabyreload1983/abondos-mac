import { Router } from "express";
import { login, logout, register } from "../../controllers/users.controller.js";
import { passportCall } from "../../utils.js";
import { authorization } from "../../utils.js";

const router = Router();

router.post(
  "/register",
  passportCall("jwt"),
  authorization("superAdmin"),
  register
);

router.post("/login", login);

router.get("/logout", passportCall("jwt"), logout);

export default router;
