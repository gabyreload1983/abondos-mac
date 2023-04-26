import { Router } from "express";
import {
  getTerminalByMac,
  addTerminal,
  updateTerminal,
  deleteTerminal,
} from "../../controllers/terminals.controller.js";

const router = Router();

router.get("/:mac", getTerminalByMac);

router.post("/", addTerminal);

router.put("/:mac", updateTerminal);

router.delete("/:mac", deleteTerminal);

export default router;
