import { customerModel } from "./models/customers.js";

export default class Customers {
  constructor() {
    console.log("Working customers with DB in mongoDB");
  }

  getAll = async () => {
    const customers = await customerModel.find().populate("terminals");
    return customers.map((customer) => customer.toObject());
  };

  addCustomer = async (customer) => await customerModel.create(customer);

  getCustomer = async (id) => await customerModel.findOne({ _id: id });

  getCustomerByCode = async (code) => await customerModel.findOne({ code });

  getCustomerByName = async (name) => await customerModel.findOne({ name });

  updateCustomer = async (id, customer) =>
    await customerModel.updateOne({ _id: id }, customer);

  deleteCustomer = async (id) => await customerModel.deleteOne({ _id: id });
}
