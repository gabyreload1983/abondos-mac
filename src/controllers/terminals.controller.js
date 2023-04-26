import { incompleteValues } from "../lib/validators/validator.js";
import * as terminalService from "../services/terminals.service.js";
import * as customerService from "../services/customers.service.js";

const getTerminalByMac = async (req, res) => {
  try {
    const { mac } = req.params;

    const terminal = await terminalService.getTerminalByMac(mac);
    if (!terminal)
      return res
        .status(404)
        .send({ status: "error", message: "terminal not found" });

    res.send({ status: "success", terminal });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addTerminal = async (req, res) => {
  try {
    const { mac, code, code_terminal, description } = req.body;
    if (incompleteValues(mac, code))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const terminal = await terminalService.getTerminalByMac(mac);
    if (terminal.length !== 0)
      return res
        .status(404)
        .send({ status: "error", message: "MAC already exists" });

    const customer = await customerService.getCustomerByCode(code);
    if (!customer)
      return res
        .status(404)
        .send({ status: "error", message: "Incorrect customer code!" });

    const response = await terminalService.addTerminal(
      mac,
      customer,
      code_terminal,
      description
    );

    res.send({ status: "success", message: "Terminal added", response });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateTerminal = async (req, res) => {
  try {
    res.send({ status: "success", message: "Endpoint Not Ready" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteTerminal = async (req, res) => {
  try {
    res.send({ status: "success", message: "Endpoint Not Ready" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { getTerminalByMac, addTerminal, updateTerminal, deleteTerminal };
