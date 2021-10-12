const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Conversation = require("../../models/Conversation");


//Create new conversation , Private function 
router.post('/',
  auth,
  check('senderId', 'senderId is required').notEmpty(),
  check('receiverId', 'receiverId is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const receiver = await User.findById(req.body.receiverId);
      const sender = await User.findById(req.body.senderId);
      if (!(sender || receiver)) {
        return res.status(400).json({ errors: [{ msg: 'sender or receiver doesnt exist' }] });
      }

      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });

      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//get all the conversations of a user
router.get("/", auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user.id] },
    });

    res.status(200).json(conversations);

  } catch (err) {
    res.status(500).json(err);
  }
});

//get a conversation by its id
router.get('/:conversationId', auth, async (req, res) => {
  try {
    
    const conversation = await Conversation.findById(req.params.conversationId);
    res.status(200).json(conversation);

  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
