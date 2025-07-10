import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  street: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  zipCode: { type: Number, require: true },
  country: { type: String, require: true },
  phone: { type: String, require: true },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
