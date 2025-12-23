import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/route.js';
dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', router);
app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})
