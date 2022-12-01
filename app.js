const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const apihadith = require('./routers/hadith.router');
const apiquran = require('./routers/quran.router');
require('./databases/mysql.db');

const app = express();

app.use(helmet());
app.use(express.json());

const NODE_ENV = process.env.NODE_ENV || 'development';
const whitelist = [];
const corsOptions = {
    origin: function (origin = '', callback) {
        if (whitelist.indexOf(origin) !== -1) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET, POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(NODE_ENV === 'development' ? cors() : cors(corsOptions));

app.get('/', (req, res) => res.send({statusCode: 200, statusMessage: 'Ok', data:'https://github.com/Al-Sunnah/API'}));

app.use('/v1/hadith', apihadith);

app.use('/v1/quran', apiquran);
module.exports = app;
