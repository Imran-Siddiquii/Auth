const authVerify = async (req, res, next) => {
  const { auth } = req.headers;
  if (auth == 'imran') {
    req.user = { id: '1234' };
    return next();
  } else {
    res.status(401).json({ error: 'Unauthorize access' });
  }
};
export { authVerify };
