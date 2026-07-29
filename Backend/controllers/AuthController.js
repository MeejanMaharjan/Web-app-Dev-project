import { register, login } from "../models/AuthModel.js";
import { generateToken } from "../utils/Auth.js";
import dotenv from 'dotenv'


const cookieOptions={
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 1000,
}


export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const registeredUser = await register(user);
    const token = generateToken(registeredUser);
    res.cookie('jwttoken',token, cookieOptions)
    return res.status(201).json({ ok: true, data: {
      _id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email,
      isAdmin: registeredUser.isAdmin,
    }});
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const loggedInUser = await login(user);
    const token = generateToken(loggedInUser);
    res.cookie('jwttoken',token, cookieOptions)
    return res.status(200).json({ ok: true, data: {
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin,
      token
    }});
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}
