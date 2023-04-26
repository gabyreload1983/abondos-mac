import Customers from "../dao/dbManagers/customers.js";

const customerManager = new Customers();

export const getAll = async () => await customerManager.getAll();

export const getCustomer = async (id) => await customerManager.getCustomer(id);

export const getCustomerByCode = async (code) =>
  await customerManager.getCustomerByCode(code);

export const addCustomer = async (name, code) => {
  const customer = {
    name: name.toUpperCase(),
    code: code.toUpperCase(),
  };
  return await customerManager.addCustomer(customer);
};

export const updateCustomer = async (id, customer) =>
  await customerManager.updateCustomer(id, customer);

export const deleteCustomer = async (id) =>
  await customerManager.deleteCustomer(id);
