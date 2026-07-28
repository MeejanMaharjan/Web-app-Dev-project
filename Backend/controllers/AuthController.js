import { register, login } from "../models/AuthModel.js";
import { generateToken } from "../utils/Auth.js";

export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const registeredUser = await register(user);
    const token = generateToken(registeredUser);
    return res.status(201).json({ data: {
      _id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email,
      isAdmin: registeredUser.isAdmin,
      token
    }});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const loggedInUser = await login(user);
    const token = generateToken(loggedInUser);
    return res.status(200).json({ data: {
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin,
      token
    }});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
