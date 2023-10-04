import json from 'jsonwebtoken';
const { verify } = json;
const secretKey = process.env.SECRET_KEY;

// verify token and extract userID when we are creating token we added there
// decode and add req.user= userID return next() ,
// match user id whatever he is sending and which id you retirive from token if both are same
// then an only get the data of that user
const verifyToken = (token) => {
  try {
    const decoded = verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

function extractUserIDFromToken(decodedToken) {
  if (decodedToken && decodedToken.userID) {
    return decodedToken.userID;
  } else {
    throw new Error('Invalid or missing user ID in token');
  }
}

const authVerify = async (req, res, next) => {
  const { auth } = req.headers;
  try {
    const decode = await verifyToken(auth);
    const userId = extractUserIDFromToken(decode);
    req.user = { userId };
    return next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorize access' });
  }
};
export default authVerify;
