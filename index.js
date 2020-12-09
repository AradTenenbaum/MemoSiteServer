import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// Routers
import postRoutes from './routes/posts.js';


// app init 
const app = express();
dotenv.config();

// Middlewares, we are passing files so we limit the size
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});


// const CONNECTION_URL = 'mongodb+srv://user:user1@cluster0.dz4xl.mongodb.net/Cluster0?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
