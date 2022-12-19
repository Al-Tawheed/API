const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const apihadith = require('./routers/hadith.router');
const apiquran = require('./routers/quran.router');
require('./databases/mysql.db');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send({statusCode: 200, statusMessage: 'Ok',data: 'Hadith & Quran',  information:'https://github.com/Al-Sunnah/API'}));

app.use('/v1/hadith', apihadith);

app.use('/v1/quran', apiquran);
module.exports = app;
