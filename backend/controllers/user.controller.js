import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import validator from "validator";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    if (!name || !email || !password)
      return res.status(400).json({ message: "Please enter all fields" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character",
        });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ _id: user._id, name, email, token });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error}` });
  }
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Invalid Email or Password.' });

		const isValidPassword = await bcrypt.compare(password, user.password);
		if(!isValidPassword) return res.status(400).json({ message: 'Invalid Email or Password.' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
		res.status(200).json({ _id: user._id, name: user.name, email: user.email, token });

	}
	catch(error) {
		res.status(500).json({ message: `Server Error: ${error}` });
	}
};

const getUserProfile = async (req, res) => {
	const userId = req.params.userId;

	try {
		const user = await User.findById(userId).select('-password');

		if(!user) return res.status(404).json({ message: 'User not found' });

		res.status(200).json(user);

	}
	catch(error) {
		res.status(500).json({ message: `Server Error: ${error}` });
	}
};

export { registerUser, loginUser, getUserProfile };
