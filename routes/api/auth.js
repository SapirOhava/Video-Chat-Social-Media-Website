const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.get('/' ,auth, async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//login (authenticate user and get the token)
router.post('/' ,[
    //the second parameter is a custom error msg
    check('email', 'Please include a valid email').isEmail(),
    check('password','password is required').exists()
] ,
async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // here is the plain text password ( that the user enters )
    const { email, password } = req.body; 
    
    try {
        let user = await User.findOne({email});
        if(!user){
            return res
            .status(400)
            .json({ errors: [{msg:'Invalid Credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
              id: user.id
            }
          };

        jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        //calback function
        //that in her we are sending back the token
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
        
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
        
});



module.exports = router;