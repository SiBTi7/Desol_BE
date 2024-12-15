import bcrypt from "bcrypt";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  res.status(200).json({ message: "Login successful", userId: user._id });
};

export const signupUser = async (req, res) => {

  const { email, password } = req.body;

  const saltRounds = 10;

  try {
    const userExist = await User.exists({ email });

    if (userExist) return res.status(403)
      .json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword
    })

    if (newUser) {
      return res.status(201).json({
        user: newUser
      })

    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
}
