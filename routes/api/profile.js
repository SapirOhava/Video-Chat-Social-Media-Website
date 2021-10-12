const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Group = require('../../models/Group');
const { check, validationResult } = require('express-validator');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./client/public/uploads/');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload = multer({storage:storage});

//get a profile
router.get('/me' ,auth, async(req,res) => {
    try {
        //populate adds the field name from user to this query that we get from the profile model
        const profile = await Profile.findOne({ user : req.user.id}).populate('user',['name','_id']);
        
           
        if(!profile){
            return res.status(400).json({msg: 'there is no profile for this user'});
        } 
        //if there is a profile
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }

});

// create or update a profile
router.post('/' , auth , upload.single('photo') , async(req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }


    const {
        Language,
        location,
        Gender,
        findMe,
        Academic_degree,
        Academic_Institution,
        Field_of_Study,
        about,
        following,
        followers,
        resetPasswordLink     
    } = req.body;


    //builds profile objects
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.file)profileFields.photo = req.file.originalname;
    Language ? profileFields.Language = Language  :  profileFields.Language ='' ;
    location ? profileFields.location = location  : profileFields.location =''; 
    Gender ? profileFields.Gender = Gender :  profileFields.Gender ='';
    findMe ? profileFields.findMe = findMe : profileFields.findMe = '';
    Academic_degree ? profileFields.Academic_degree = Academic_degree :profileFields.Academic_degree ='';
    Academic_Institution ? profileFields.Academic_Institution = Academic_Institution :profileFields.Academic_Institution ='';
    Field_of_Study? profileFields.Field_of_Study = Field_of_Study :profileFields.Field_of_Study ='';
    profileFields.Field_of_Study = profileFields.Field_of_Study.split(',');
    about ? profileFields.about = about : profileFields.about ='';
    
    if(following) profileFields.following = following.split(',').map(follow => follow.trim());
    if(followers) profileFields.followers = followers.split(',').map(follower => follower.trim());
    
    if(resetPasswordLink) profileFields.resetPasswordLink = resetPasswordLink;

    try {
        
        let profile = await Profile.findOne({user:req.user.id});
        //if there is a profile , it updates it
        if(profile){
            
            //update the profile
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set: profileFields},
                {new:true}
            );
            return res.json(profile)
        }

        //if there isnt that profile already , we will create a new one
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }
});


// search for pal's 
router.post('/search' , auth  , async(req,res) => {
    
   
    //checking in the subArray is  a sub array of the bigArray
    const subArray = (bigArray,subArray) => { for (i = 0; i < subArray.length ; i++) {
        if(!bigArray.includes(subArray[i]))
            return false;
                              }
        return true;
                            }
                            
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array()})
    }

    
    const {
        Language,
        location,
        Gender,
        Academic_degree,
        Academic_Institution,
        Field_of_Study,   
    } = req.body;
        
    //builds profile objects
    const profileFields = {};
    Language ? profileFields.Language = Language  :  profileFields.Language ='' ;

    location ? profileFields.location = location  : profileFields.location =''; 

    Gender ? profileFields.Gender = Gender :  profileFields.Gender ='';

    Academic_degree ? profileFields.Academic_degree = Academic_degree :profileFields.Academic_degree ='';

    Academic_Institution ? profileFields.Academic_Institution = Academic_Institution :profileFields.Academic_Institution ='';

    Field_of_Study? profileFields.Field_of_Study = Field_of_Study :profileFields.Field_of_Study ='';
    profileFields.Field_of_Study = profileFields.Field_of_Study.split(',');


    //find pal 
    try {
        
        const p = await Profile.find({ findMe: 'y' }).populate('user',['name']);;
       
        const profiles = p.filter(x => ((profileFields.Language==='')|| x.Language.toLowerCase()===profileFields.Language.toLowerCase() ) 
        && ((profileFields.location==='')|| x.location.toLowerCase()===profileFields.location.toLowerCase() )
        &&((profileFields.Gender==='')|| x.Gender.toLowerCase()===profileFields.Gender.toLowerCase() ) &&
        ((profileFields.Academic_degree==='')|| x.Academic_degree.toLowerCase()===profileFields.Academic_degree.toLowerCase() )&&
        ((profileFields.Academic_Institution==='')|| x.Academic_Institution.toLowerCase()===profileFields.Academic_Institution.toLowerCase() )
        && ( profileFields.Field_of_Study[0]===''|| subArray(x.Field_of_Study,profileFields.Field_of_Study)));
       

        
        res.json(profiles);
        
    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('server error');
        
    }
});


//get all profiles , it is a public function
router.get('/', async(req,res)=>{
    try {
        
        const profiles = await Profile.find({ findMe: 'y' }).populate('user',['name']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//get profile by user id , public function
router.get('/user/:user_id', async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user:req.params.user_id})
        .populate('user',['name','photo']);
        
        if(!profile)  {
            return res.status(400)
            .json({msg:'Profile not found'});
        }

        res.json(profile);
         
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});


//delete profile,user&posts&followers&following&groups , it is a private function
router.delete('/',auth, async(req,res)=>{
    try {
        //remove user posts
        await Post.deleteMany({ user: req.user.id});

        //update the followers&following&groups
        const myProfile = await Profile.findOne({ user:req.user.id});

        for (let index = 0; index < myProfile.followers.length; index++) {
            const followerId = myProfile.followers[index];
            const FollowerProfile = await Profile.findOne({ user:followerId});
            FollowerProfile.following = FollowerProfile.following.filter(f =>f.toString() !== req.user.id.toString() );
            await FollowerProfile.save();
            await myProfile.save();
        }
        for (let index = 0; index < myProfile.following.length; index++) {
            const followingId = myProfile.following[index];
            const FollowingProfile = await Profile.findOne({ user:followingId});
            FollowingProfile.followers = FollowingProfile.followers.filter(f=>f.toString() !== req.user.id.toString() );
            await FollowingProfile.save();
            await myProfile.save();
        }
        for (let index = 0; index < myProfile.followingGroups.length; index++) {
            const groupId = myProfile.followingGroups[index];
            const group = await Group.findById(groupId);
            group.followers = group.followers.filter(f=>f.toString() !== req.user.id.toString() );
            await group.save();
            await myProfile.save();
        }

        //delete the profile
        await Profile.findOneAndRemove({ user:req.user.id});
        //delete user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'user deleted'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});


router.put('/about',
auth,
check('about', 'about is required').notEmpty(),
async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const{about}=req.body;
    const newAbout = {about:about};
    try {
        const profile= await Profile.findOne({user:req.user.id})
        profile.about=about;
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//addFollower
router.put('/addFollower/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        profile.followers.unshift( req.user.id );
        await profile.save();
        const ownerProfile = await Profile.findOne({user:req.user.id});
        await ownerProfile.following.unshift(profile.user._id);
        await ownerProfile.save(); 
        return res.json(profile.followers);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//removeFollower
router.put('/removeFollower/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        profile.followers = profile.followers.filter((follower)=>(follower.toString() !== req.user.id ));
        await profile.save();
        const ownerProfile = await Profile.findOne({user:req.user.id});
        ownerProfile.following = await ownerProfile.following.filter((f)=>(f.toString()  !==  profile.user._id.toString()));
        await ownerProfile.save(); 
        return res.json(profile.followers);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


//addFollowingGroup , id of the group
router.put('/addFollowingGroup/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        group.followers.unshift( req.user.id );
        await group.save();
        const ownerProfile = await Profile.findOne({user:req.user.id});
        await ownerProfile.followingGroups.unshift(group._id);
        await ownerProfile.save(); 
        return res.json(group.followers);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });




//removeFollowingGroup
router.put('/removeFollowingGroup/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        group.followers = group.followers.filter((follower)=>(follower.toString() !== req.user.id ));
        await group.save();
        const ownerProfile = await Profile.findOne({user:req.user.id});
        ownerProfile.followingGroups = await ownerProfile.followingGroups.filter((f)=>(f.toString()  !==  group._id.toString()));
        await ownerProfile.save(); 
        return res.json(group.followers);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });  


module.exports = router;