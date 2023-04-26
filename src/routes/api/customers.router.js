import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../controllers/customers.controller.js";

const router = Router();

router.get("/", getCustomers);

router.get("/:code", getCustomer);

router.post("/", addCustomer);

router.put("/:code", updateCustomer);

router.delete("/:code", deleteCustomer);

export default router;
