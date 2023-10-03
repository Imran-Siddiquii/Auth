import User from '../models/user.model.js';
import { genSalt, hash, compare } from 'bcrypt';
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
      const response = await savedUser.save();
      res.json({ message: 'Registration Successful', access_token: '1223344' });
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
      return res.json({ message: 'login successful', token: '1223' });
    }else{
      return res.status(400).json({ message: 'Wrong password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed 3' });
  }
};

export { signUpController, loginController };
