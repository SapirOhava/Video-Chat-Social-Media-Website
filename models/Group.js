const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GroupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    posts: [{ 
        post:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'post'
        }  
    }],

    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default:"",
     }],

});

module.exports = mongoose.model('group', GroupSchema);