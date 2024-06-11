const userModel =require("../models/userModel") 
const bcrypt =require('bcryptjs') 
const jwt=require('jsonwebtoken')


const registerController = async (req, res) => {
    try {
        console.log("Register request received:", req.body);
      const exisitingUser = await userModel.findOne({ email: req.body.email });
      //validation
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "User ALready exists",
        });
      }
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      //rest data
      const user = new userModel(req.body);
      await user.save();
      return res.status(201).send({
        success: true,
        message: "User Registerd Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });
    }
  };
  
//login



const loginController = async (req, res) => {
    try {
        // Ensure email and password are provided
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Retrieve the user by email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid Credentials"
            });
        }


        // Ensure the password field exists in the retrieved user object
        if (!user.password) {
            return res.status(500).send({
                success: false,
                message: "Internal error: Password not found in user record"
            });
        }
        // if(user.role!==req.body.role){
        //     return res.status(500).send({
        //         success:false,
        //         message:"Role does not match"
        //     })
        // }

        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error during login",
            error: error.message || error
        });
    }
};
// current user
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Current User fetched successfully',
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Unable to fetch the user',
            error: error.message || error
        });
    }
};

module.exports = { registerController, loginController ,currentUserController};
