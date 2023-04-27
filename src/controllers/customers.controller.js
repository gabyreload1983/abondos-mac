import { incompleteValues } from "../lib/validators/validator.js";
import * as customerService from "../services/customers.service.js";

const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAll();
    if (!customers)
      return res
        .status(404)
        .send({ status: "error", message: "customers not found" });

    res.send({ status: "success", customers });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getCustomer = async (req, res) => {
  try {
    const { code } = req.params;

    const customer = await customerService.getCustomerByCode(code);
    if (!customer)
      return res
        .status(404)
        .send({ status: "error", message: "customer not found" });

    res.send({ status: "success", customer });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addCustomer = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (incompleteValues(name, code))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const customerCode = await customerService.getCustomerByCode(code);
    if (customerCode)
      return res
        .status(404)
        .send({ status: "error", message: "Customer already exists!" });

    const customerName = await customerService.getCustomerByName(name);
    if (customerName)
      return res
        .status(404)
        .send({ status: "error", message: "Customer already exists!" });

    const response = await customerService.addCustomer(name, code);

    res.send({ status: "success", message: "Customer added", response });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    res.send({ status: "success", message: "Endpoint Not Ready" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    res.send({ status: "success", message: "Endpoint Not Ready" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
