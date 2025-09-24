import mongoose, { Schema } from "mongoose";
import { User } from "../types/user";

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  bornDate: { type: String, required: true },
  documentType: { type: String, enum: ["DNI", "PASAPORTE"], required: true },
  documentNumber: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

export const UserModel = mongoose.model<User>("User", UserSchema);
