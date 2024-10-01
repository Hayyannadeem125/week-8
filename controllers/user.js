import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import user from "../models/user-model.js";

export const postUserData = async (req, res) => {
  try {
    const {
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
    //   address,
      role,
    } = req.body;
    console.log(
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
    //   address,
      role,
    );

    const image = req.file && req.file.filename


    const isEmailExisted = await user.findOne({ email: email });
    if (isEmailExisted) {
      return res.status(400).json({ message: "Email is already existed" });
    }

    const userData = user({
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
    //   address,
      role,
    //   createdAt,
    //   image:image
    });

    await userData.save();
    return res
      .status(200)
      .json({ message: "data saved succesfully", success: true, userData });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUsersData = async (req, res) => {
  try {
    const getUsers = await user.find();
    return res.status(200).json({ success: true, getUsers });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const getUserId = req.params.id;
    const userData = await user.findById(getUserId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, userData, message: "got user data" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await user.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, updatedUser, message: "updated user data" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



// reisteruser api

// const registerUser = async (res,req) => {
//     try{
//     let userData = req.body;
//     const hash_password = await bcrypt.hash(userData.password,10);
//     userData.password =hash_password;
//     const user = await user.create(userData);
//     return res.status(200).json({ message :"user Created successfully" })
//     }catch (error) {
// res.status (500).json(error.message)
// }
// }

//signinsignupuser


dotenv.config();

//register api
export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData.password, 10); 
        userData.password = hashedPassword;
        const User = await user.create(userData);
        return res.json({
            message: "User registered successfully",
            User
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

//login api with jwt

export const loginUser = async (req, res) => {
    try {
        const userData = req.body;
        const User = await user.findOne({ email: userData.email });
        if (!User) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }
        const isValidPass = await bcrypt.compare(userData.password, User.password);

        if (!isValidPass) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const jwttoken = jwt.sign({ role: User.role, email: User.email, password: User.password }, process.env.PRIVATE_KEY, { expiresIn: "2h" });
        //cookie
        res.cookie("jwt", jwttoken, {
            httpOnly: true, secure: true,
            maxAge: 5 * 60 * 60 * 1000 * 24
        })
        return res.status(200).json({
            message: "Login Successful",
            token: jwttoken,
            userData
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
}


//logout api with jwt

export const logoutUser = async (req, res) => {
    try {
        console.log("000000", req.user)
        res.clearCookie("jwt");
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}


// export const getUser = async (req, res) => {
//     try {
//         const getData = await user.find();
//         return res.status(200).json({ message: "HELLOO DATA GOT", getData });
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// }