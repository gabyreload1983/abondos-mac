import Terminals from "../dao/dbManagers/terminals.js";
import Customers from "../dao/dbManagers/customers.js";

const terminalManager = new Terminals();
const customerManager = new Customers();

export const getAll = async () => await terminalManager.getAll();

export const getTerminal = async (id) => await terminalManager.getTerminal(id);

export const getTerminalByMac = async (mac) => {
  mac = mac.toUpperCase();
  return await terminalManager.getTerminalByMac(mac);
};

export const addTerminal = async (
  mac,
  customer,
  code_terminal,
  description
) => {
  if (code_terminal) code_terminal = code_terminal.toUpperCase();
  const terminal = {
    mac: mac.toUpperCase(),
    customer: customer._id,
    code_terminal,
    description,
  };
  const result = await terminalManager.addTerminal(terminal);

  const customerToUpdate = await customerManager.getCustomer(customer._id);
  customerToUpdate.terminals.push(result._id);
  await customerManager.updateCustomer(customer._id, customerToUpdate);

  return result;
};

export const updateTerminal = async (id, terminal) =>
  await terminalManager.updateTerminal(id, terminal);

export const deleteTerminal = async (id) =>
  await terminalManager.deleteTerminal(id);
