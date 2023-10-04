import User from '../models/user.model.js';

const userProfileController = async (req, res) => {
  const { userId } = req.params;
  const userID = req.user.userId;
  if (userId == userID) {
    const data = await User.findOne({ _id: userId });
    res.json({ data });
  } else {
    res.status(403).json({ message: 'Trying to access unauthorized' });
  }
};
export { userProfileController };
