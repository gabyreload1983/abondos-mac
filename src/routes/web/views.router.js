import { Router } from "express";
import passport from "passport";
import { authorization } from "../../utils.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  async (req, res) => {
    res.render("validateMac", { user: req.user });
  }
);

router.get(
  "/adding-terminal",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  authorization("admin"),
  async (req, res) => {
    res.render("addingTerminal", { user: req.user });
  }
);

router.get(
  "/adding-customer",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  authorization("admin"),
  async (req, res) => {
    res.render("addingCustomers", { user: req.user });
  }
);

router.get(
  "/customers-detail",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  authorization("admin"),
  async (req, res) => {
    res.render("customersDetail", { user: req.user });
  }
);

router.get(
  "/register",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  authorization("superAdmin"),
  (req, res) => {
    res.render("register", { user: req.user });
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  async (req, res) => {
    res.render("profile", {
      user: req.user,
    });
  }
);

router.get("*", async (req, res) => {
  res.render("notFound");
});

export default router;
