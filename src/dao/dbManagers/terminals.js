import { terminalModel } from "./models/terminals.js";

export default class Terminals {
  constructor() {
    console.log("Working terminals with DB in mongoDB");
  }

  getAll = async () => {
    const terminals = await terminalModel.find();
    return terminals.map((terminal) => terminal.toObject());
  };

  addTerminal = async (terminal) => await terminalModel.create(terminal);

  getTerminal = async (id) => await terminalModel.find({ _id: id });

  getTerminalByMac = async (mac) => await terminalModel.find({ mac });

  updateterminal = async (id, terminal) =>
    await terminalModel.updateOne({ _id: id }, terminal);

  deleteProduct = async (id) => await terminalModel.deleteOne({ _id: id });
}
