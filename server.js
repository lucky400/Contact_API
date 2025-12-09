import express from 'express';
import mongoose from 'mongoose';
// import { register } from './controllers/user.js';
import bodyParser from 'express';
import userRouter from './Routes/user.js';
import contactRouter  from './Routes/contact.js';

import { config } from 'dotenv';






const app = express();

// env setup
config({path:'.env'});

// middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API project!');
});

// user routes
// @api des : user registration
// api method : post
// api endpoint : /api/user/register

app.use('/api/users',userRouter);

// contact Router

app.use('/api/contact',contactRouter);





mongoose.connect(process.env.MONGO_URI,{
    dbName:"NodeJs_Mastery_course"
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});