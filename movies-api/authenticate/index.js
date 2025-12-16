import jwt from 'jsonwebtoken';
import User from '../api/users/userModel.js';

const authenticate = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ msg: "No authorization header" });
      }
  
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ msg: "Bearer token missing" });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET);
  
      const user = await User.findByUserName(decoded.username);
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
  
      req.user = user; 
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  };
  

export default authenticate;
