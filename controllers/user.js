
import user from "../models/user-model.js"
import bcrypt  from 'bcryptjs'

export const postUserData = async (req , res ) => {
    try{
        const {name , userName , password, email  } = req.body;
        console.log(name , email, password, userName); 
        const isEmailExisted = await user.findOne({ email: email });
        if(isEmailExisted) {
            return res.status(400).json({ message: "Email is already existed" });
        }
        
        const userData = user({
            name,
            userName,
            email,
            password
        })

        await userData.save();
        return res.status(200).json({ message: "data saved succesfully", success: true , userData});



    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getUsersData = async (req, res) => {
    try {
        const getUsers = await user.find()
        return res.status(200).json({ success : true , getUsers});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getUserById = async (req , res) => {
    try{
        const getUserId = req.params.id;
        const userData = await user.findById(getUserId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });

        }
        return res.status(200).json({ success: true, userData , message :"got user data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      
      const deletedUser = await user.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  };

  export  const updateUser = async (req, res) => {
    try{
        const  userId = req.params.id;
        const updatedUser = await user.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return  res.status(200).json({ success: true, updatedUser , message :"updated user data"});
    }
    catch(error){
        return res.status(500).json(error.message);
    }
  };

  export const registerUser =  async (req, res) => {
    try {
        const userData  = req.body;
        const hash_password =  await bcrypt.hash(userData.password, 10);
        userData.password  = hash_password;
        const existingUser = await user.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser = await user.create(userData);
        return res.status(201).json({ success: true, newUser , message :"user created successfully"});

    } catch (error) {
        console.log(error.message);
    }
  }


// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, 'jwtSecret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

