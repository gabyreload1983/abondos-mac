import { Router } from "express";
import {
  getTerminals,
  getTerminalByMac,
  addTerminal,
  updateTerminal,
  deleteTerminal,
} from "../../controllers/terminals.controller.js";
import { authorization } from "../../utils.js";

const router = Router();

router.get("/", getTerminals);

router.get("/:mac", getTerminalByMac);

router.post("/", authorization("admin"), addTerminal);

router.put("/:mac", authorization("admin"), updateTerminal);

router.delete("/:mac", authorization("superAdmin"), deleteTerminal);

export default router;
