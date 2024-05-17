import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(409).send({
      success: false,
      message: "UnAuthorized Access - No token provided",
      // toast.error("UnAuthorized Access - No token provided")
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "UnAuthorized Access - Invalid token",
    });
  }
};

//Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     console.log("decode :", decode);
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access - No user information provided",
      });
    }

    const user = await userModel.findById(req.user._id);
    console.log("user:", user);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access - User not found",
      });
    }

    if (user.role !== 0) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access - Insufficient permissions",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

