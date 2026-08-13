import { register, login } from "../models/AuthModel.js";
import { generateToken } from "../utils/Auth.js";
import User from "../data/User.js";
import dotenv from 'dotenv'

// Load env before cookieOptions is evaluated — this module is imported from app.js
// before app.js reaches its own dotenv.config() call.
dotenv.config()

const cookieOptions={
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 1000,
}


export const registerUser = async (req, res) => {
  try {
    // Whitelist the fields a client may set — never pass req.body straight through,
    // or a caller can grant itself isAdmin.
    const { name, email, password } = req.body;
    const registeredUser = await register({ name, email, password });
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
    const { email, password } = req.body;
    const loggedInUser = await login({ email, password });
    const token = generateToken(loggedInUser);
    res.cookie('jwttoken',token, cookieOptions)
    return res.status(200).json({ ok: true, data: {
      _id: loggedInUser._id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin,
    }});
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ ok: false, message: 'User not found' });
    }
    return res.status(200).json({ ok: true, data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }});
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}

export const logoutUser = (req, res) => {
  // Must clear with the same options the cookie was set with, or the browser keeps it.
  const { maxAge, ...clearOptions } = cookieOptions;
  res.clearCookie('jwttoken', clearOptions);
  return res.status(200).json({ ok: true, message: 'Logged out' });
}
