// Import any required models
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const {GenToken} = require("../utils/GenToken");
const saltRounds = 10;
// Get all usersk
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    //console.log(req.body)
    const { username, email, password } = req.body;

    const e = await User.findOne({ email: email });

    if (e) {
      //console.log("this user is already registered");
      return res
        .status(400)
        .json({ message: "This mail is already registered" });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      const newUser = await User.create({
        username: username,
        email: email,
        password: hash,
      });
      console.log("first",newUser._id)

      const Token=GenToken(newUser._id.toString());
    //console.log(Token);
      res.cookie("token", Token, {
        withCredentials: true,
        httpOnly: true,
      });

      return res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
 
    const { email, password } = req.body;
    console.log(req.body)
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in DB
    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
    
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const Token=GenToken({id:user._id.toString()});
     
   
    res.cookie("token", Token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    });
    // Send response with user data (no JWT)
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
