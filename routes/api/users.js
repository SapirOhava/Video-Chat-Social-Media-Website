const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//post request to register users
router.post('/' ,[
    //the second parameter is a custom error msg
    check('name','name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min: 6 }),
] ,
async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password , photo } = req.body;
    
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ errors: [{msg:'User already exist'}]});
        }

        user = new User({
            name,
            email,
            password,
            photo
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password , salt);
        await user.save();
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

