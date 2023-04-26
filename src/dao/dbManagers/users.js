import { userModel } from "./models/users.js";

export default class Users {
  constructor() {
    console.log("Working users with DB in mongoDB");
  }

  create = async (user) => await userModel.create(user);

  findById = async (id) => await userModel.findOne({ _id: uid });

  findByEmail = async (email) => await userModel.findOne({ email });

  findByCode = async (code_technical) =>
    await userModel.findOne({ code_technical });

  update = async (email, user) => await userModel.updateOne({ email }, user);
}
