const express = require('express');
const Learn= require('../models/learn')
const bcrypt = require('bcryptjs');

const User=require('../models/auth')
const router = express.Router();
const jwt = require('jsonwebtoken');
//    const app=express();
// let user = require('../models/user-schema');
router.route('/').post( async (req, res, next) => {
  
    var myData = new Learn(req.body);
     myData.save()
     .then(item => {
     res.send("item saved to database");
       })
     .catch(err => {
      res.status(400).send("unable to save to database");
       });
});


//signup

router.post('/dashboard/addAdmin', async (req, res) => {
    try {
      const {email, password } = req.body;
  
      // Check if the user already exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword
      });
      await newUser.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


router.post('/dashboard/admin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'mysecretkey');
      return res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 
  





router.get("/val", async(req,res) => {
    try {
        const data = await Learn.find();
        res.json(data);
    } catch (error) {
        res.status(500).send({ msg : "could not get /", error : error.message, status : false })
    }
})





module.exports = router;