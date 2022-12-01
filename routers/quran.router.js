const express = require('express');
const router = express.Router();
const pool = require('../databases/mysql.db');

const cheerio = require("cheerio");
const rs = require("request");



// Endpoint for getting random hadith
router.get('/:language/random', async (req, res) => {
    let language = req.params.language;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!language.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }

    var dbname = languages(language);

    try{ 
        const sql = `SELECT * FROM ${dbname} ORDER BY RAND() LIMIT 1`;
        const [rows] = await pool.execute(sql);
        res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'Successfully retrieved hadith',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});


// Endpoint for surah
router.get('/:language/surah/:number', async (req, res) => {
    let number = req.params.number;

    let language = req.params.language;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!language.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    var dbname = languages(language);

    if(isNaN(number))
    {
      return  res.status(500).send({ statusCode: 500, statusMessage: 'chapter number is not an number', message: null, data: null });
    }

    try{ 
        const sql = `SELECT * FROM ${dbname} WHERE surah="${number}" ORDER BY ayah `;
        const [rows] = await pool.execute(sql);
        res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'Successfully retrieved all the hadiths.',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});

// Endpoint for getting ayah
router.get('/:language/verse_key/:number', async (req, res) => {
    var number = req.params.number;
    var number = number.split(':');
    let surah = number[0];
    let ayah = number[1];

    let language = req.params.language;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!language.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    var dbname = languages(language);

    if(isNaN(surah) || isNaN(ayah))
    {
      return  res.status(500).send({ statusCode: 500, statusMessage: 'chapter number is not an number', message: null, data: null });
    }

    try{ 
        const sql = `SELECT * FROM ${dbname} WHERE surah="${surah}" AND ayah="${ayah}" ORDER BY ayah `;
        const [rows] = await pool.execute(sql);
        res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'Successfully retrieved all the hadiths.',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});

module.exports = router;

function languages(str) {
    switch(str){
        case 'ar':
            return "quran_ayat";
        case 'eng':
            return "en_sahih";
        case 'nl':
             return "nl_siregar";
        default:
            return "quran_ayat"
    }
}