import { comparePassword, hashedPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// registration Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // checking required fields not empty
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone number is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        error: "Already registered Please Login",
      });
    }
    // register User
    const hashPassword = await hashedPassword(password);
    // save new user in Database
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashPassword,
    }).save();
    res.status(202).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

// LogIn Controller
export const loginController = async (req, res) => {
  try {
    // checking the condition when email and password is empty while passing from the client
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // checking user email is present in database or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // Compare user Entered password and bcrypt password with the help of comparePassword and matching the password is present in database or not
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Creating JWT Token on the basis of _id with JWT_SECRET which is .env file and it is expire in 7 day.
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// test controllers for middleware checking
export const testController = (req, res) => {
  res.send("protected route");
};
