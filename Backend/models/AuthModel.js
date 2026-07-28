import User from "../data/User.js";
import bcrypt from "bcrypt";

export const register = (user) => {
  return User.create(user);
};

export const login = async (user) => {
  const { email, password } = user;
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return foundUser;
};
