const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Group = require('../../models/Group');

//Create a post , Private function 
//:id - id of the group
router.post(
  '/:id',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const profile=await Profile.findOne({user:user.id});
        const group = await Group.findById(req.params.id);
        if(!group){
            return res.status(400).json({ errors: [{msg:'group doesnt exist'}]});
        }

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        photo: profile.photo,
        group: req.params.id,
        user: req.user.id
      });

        const post = await newPost.save();
        group.posts.unshift({ post: post.id });
        await group.save();

        res.json(post);
       
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);



// Get all posts in a group , Private function
//:id - id of the group   
router.get('/:id', auth, async (req, res) => {
    try {
      const posts = await Post.find({group:req.params.id}).sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//Get post by id , Private function
router.get('/post/:postId', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

//Delete a post by id of the post , Private function
router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const group = await Group.findById(post.group);
      
      
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check user that want to delete the post is the one who wrote it !
      if (post.user.toString() !== req.user.id && req.user.id !== group.owner.toString()) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      
      group.posts = group.posts.filter((p)=>(p.post.toString()) !== req.params.id );
      await group.save();
      await post.remove();

  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  


// Like a post by the id of the post, Private function
router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
        post.likes.unshift({ user: req.user.id });
        await post.save();
        return res.json(post.likes);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// Unlike a post by the id of the post, Private function
router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has not yet been liked
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//comments are identical to post , except they dont have likes
//Comment on a post by the id of the post, Private function
router.post(
    '/comment/:id',
    auth,
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const profile=await Profile.findOne({user:user.id});
        const post = await Post.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          photo: profile.photo,
          user: req.user.id
        };
        //push to the start of the array
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });


//Delete comment , Private function
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out comment
        const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  });


module.exports = router;
