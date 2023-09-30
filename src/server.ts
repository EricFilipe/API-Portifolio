import express from 'express';
import { pool } from './mysql';
import { v4 as uuidv4 } from 'uuid'

const app = express()

const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST");
    next();
})

app.use(cors())

app.use(express.json())

app.post('/userdata', (request, response) => {
    const { name, email, message } = request.body;
    pool.getConnection((err: any, connection: any) => {
        connection.query(
            'INSERT INTO userinformation (user_id, name, email, message) VALUES (?,?,?,?)',
            [uuidv4(), name, email, message],
            (err: any, result: any, fields: any) => {
                if(err) {
                    return response.status(400).json(err)
                }
                response.status(200).json({success: true});
            }
        )
    })
})



app.listen(4000)