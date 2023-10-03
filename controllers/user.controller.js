import User from '../models/user.model.js';

const addUserController = async (req, res) => {
  const body = req.body;
  try {
    const userAdded = await new User(body);
    const response = await userAdded.save();
    res.json({ response });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

export { addUserController };
