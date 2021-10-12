const express = require('express');
const app = express();
const connectDB = require('./config/db');


//connecting database
connectDB();

app.use(express.json());

app.get('/' , (req,res)=> res.send('api running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages', require('./routes/api/messages'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=> console.log(`server started on port ${PORT}`));