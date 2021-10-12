const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Group = require('../../models/Group');
const auth = require('../../middleware/auth');

//post request to create a group , private function
router.post('/', auth,
    //the second parameter is a custom error msg
    check('name', 'name is required').not().isEmpty(),
    check('subject', 'subject is required').not().isEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, subject, about } = req.body;
        const owner = req.user.id;


        try {
            let group = await Group.findOne({ name });
            if (group) {
                return res.status(400).json({ errors: [{ msg: 'group with that name already exist' }] });
            }

            group = new Group({
                name,
                owner,
                subject,
                about
            });

            await group.save();
            res.json(group);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });








//delete request to delete a group by its id, private function
router.delete('/:id', auth,

    async (req, res) => {
        const id = req.params.id;
        try {
            const group = await Group.findById(id);
            if (!group) {
                return res.status(400).json({ errors: [{ msg: 'group doesnt exist' }] });
            }

            // Check user that want to delete the group is the one who created it !
            if (group.owner.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }

            //delete all the posts of the group , before we delete the group
            const posts = await Post.find({ group: id }).remove();
            
            for (let index = 0; index < group.followers.length; index++) {
                const followerId = group.followers[index];
                //const Followeruser = await User.findById(followerId);
                const FollowerProfile = await Profile.findOne({ user:followerId});
                FollowerProfile.followingGroups = FollowerProfile.followingGroups.filter(f =>f.toString() !== id.toString() );
                await FollowerProfile.save();
                await group.save();
            }


            await group.remove();
            return res.json({ msg: 'group removed' });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });


//get request to get all groups of a given user , private function
router.get('/myGroup', auth,

    async (req, res) => {
    
        
        try {
            let groups = await Group.find({ owner:req.user.id });
            if (!groups) {
                return res.status(400).json({ errors: [{ msg: 'there are no groups for this user' }] });
            }

            res.json(groups);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });

module.exports = router;



//get request to get all groups  , private function
router.get('/', auth,

    async (req, res) => {
    
        
        try {
            let groups = await Group.find();
            if (!groups) {
                return res.status(400).json({ errors: [{ msg: 'there are no groups for this user' }] });
            }

            res.json(groups);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });

module.exports = router;



//get request to get a groups by a given id , private function
router.get('/:id', auth,

    async (req, res) => {
        

        try {
            let group = await Group.findById(req.params.id);
            if (!group) {
                return res.status(400).json({ errors: [{ msg: 'this group doesnt exist' }] });
            }

            res.json(group);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });

module.exports = router;

