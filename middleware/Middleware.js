//usermiddleware.js

import jwt from "jsonwebtoken";

export const Middleware = async (req, res, next) => {
  req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  await jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) {
      return res.status(403).json(err.message);
    }
    req.user = user;
    next();
  });
};

//Midleware Role base

export const roleBasedMiddleware = (...allroles) => {
  return async (req, res, next) => {
    try {
      if (!allroles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to access" });
      }
      next();
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
};
