"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = require("./mysql");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST");
    next();
});
app.use(cors());
app.use(express_1.default.json());
app.post('/userdata', (request, response) => {
    const { name, email, message } = request.body;
    mysql_1.pool.getConnection((err, connection) => {
        connection.query('INSERT INTO userinformation (user_id, name, email, message) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), name, email, message], (err, result, fields) => {
            if (err) {
                return response.status(400).json(err);
            }
            response.status(200).json({ success: true });
        });
    });
});
app.listen(4000);
