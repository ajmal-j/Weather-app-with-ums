import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User, UserType } from "../model/UserModel";
import { hashPassword, matchPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

const logIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, contact } = req.body;

  const user: UserType | null = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credential.");
  }
  const compare = await matchPassword(password, user.password);
  if (!compare) {
    throw new Error("Password not matches");
  }
  let token;
  if (user._id) token = generateToken(user._id);
  const userData = {
    email: user.email,
    name: user.name,
    profile: user.profile,
    contact: user.contact,
    id: user._id,
    token,
  };
  res.status(200).json({ userData });
});

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, contact, profile } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User already exist.");
  }
  const encryptedPassword = await hashPassword(password);
  const data: UserType = {
    email,
    name,
    contact,
    password: encryptedPassword,
    profile: profile
      ? profile
      : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  };

  await User.create(data)
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error while creating user.");
    });
});

export { logIn, signUp };