const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
    photo: {
        type: String,
        default: ""
    
  },
  date: {
    type: Date,
    default: Date.now
  },

Language: {
    type: String,
    trim: true,
    default: ""
},
location: {
    type: String,
    trim: true,
    default: ""
},
Gender: {
    type: String,
    trim: true,
    default: ""
},

findMe: {
    type: String,
    trim: true,
    default: "y"
},


Academic_degree: {
    type: String,
    trim: true,
    default: ""
},

Academic_Institution: {
    type: String,
    trim: true,
    default: ""
},
Field_of_Study: {
    type: [String],
    trim: true,
    default: ""
},
about: {
    type: String,
    trim: true,
    default: ""
},
following: [
    { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' ,
    default:"",
    }],

followers: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default:"",
 }],
 
 followingGroups:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
    default:"",
 }],
    

resetPasswordLink: {
    data: String,
    default: ""
}


});

module.exports = mongoose.model('profile', ProfileSchema);