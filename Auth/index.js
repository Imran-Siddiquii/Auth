import User from '../models/user.model.js';
import { genSalt, hash, compare } from 'bcrypt';
import json from 'jsonwebtoken';
const { sign } = json;
const secretKey = process.env.SECRET_KEY;

const signUpController = async (req, res) => {
  const body = req.body;
  try {
    const userList = await User.find({});
    const userExists = userList.find(
      (user) => user.username == body.username.toLowerCase()
    );
    if (userExists) {
      res.status(400).json({ message: 'Username already taken' });
    } else {
      const salt = await genSalt(10);
      const hashPassword = await hash(body.password, salt);
      const user = { ...body, password: hashPassword };
      const savedUser = await new User(user);
      await savedUser.save();
      // creating a token
      const access_token = sign({ userID: savedUser._id }, secretKey, {
        expiresIn: '24h',
      });
      res.json({ message: 'Registration Successful', access_token });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const userList = await User.find({});
  const userExists = userList.find(
    (user) => user.username == username.toLowerCase()
  );

  if (!userExists) {
    return res.status(401).json({ message: 'User not found' });
  }
  try {
    const checkPassword = await compare(password, userExists.password);
    if (checkPassword) {
      // creating token
      const access_token = sign({ userID: userExists._id }, secretKey, {
        expiresIn: '24h',
      });
      return res.json({ message: 'login successful', access_token });
    } else {
      return res.status(400).json({ message: 'Wrong password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed 3' });
  }
};

export { signUpController, loginController };
