import express from "express";
import "./dao/dbManagers/dbConfig.js";

import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";

import terminalsRouter from "./routes/api/terminals.router.js";
import customersRouter from "./routes/api/customers.router.js";
import usersRouter from "./routes/api/users.router.js";
import viewsRouter from "./routes/web/views.router.js";

import config from "./config/config.js";
import { __dirname } from "./utils.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use("/api/terminals", terminalsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

const port = config.port;
app.listen(port, () => console.log(`Listening on port ${port}`));
