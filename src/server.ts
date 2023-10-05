import express from 'express';
import { v4 as uuidv4 } from 'uuid'
import { prismaClient } from './database';

const app = express()

const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://api-portifolio-5ov6pelzt-ericfilipe.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST");
    next();
})

app.use(cors())

app.use(express.json())

app.get('/', async (req, res) => {
    const userinformation = await prismaClient.userMessage.findMany()
    res.json(userinformation)
})

app.post('/userdata', async (request, response) => {
    const { name, email, message } = request.body;
    const user = await prismaClient.userMessage.create({
        data: {
            name,
            email,
            message,
        }
    })
  return response.json(user)
})


app.listen(process.env.PORT || 4000)