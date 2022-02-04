import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Encrypt password using BcryptJS
UserSchema.methods.encryptPassword = async pasword => {
  const salt = await bcrypt.genSalt(10) //applies the algorithm 10th times, return hash
  const hash = bcrypt.hash(pasword, salt); //encrypt the password
  return hash;
};

// Compare user's password with hash password
// is needed function for use this of the UserSchema (arrow functions don't allow it)
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", UserSchema);
