import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../controllers/customers.controller.js";
import { authorization } from "../../utils.js";

const router = Router();

router.get("/", getCustomers);

router.get("/:code", getCustomer);

router.post("/", authorization("admin"), addCustomer);

router.put("/:code", authorization("admin"), updateCustomer);

router.delete("/:code", authorization("superAdmin"), deleteCustomer);

export default router;
