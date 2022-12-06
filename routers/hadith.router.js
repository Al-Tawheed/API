const express = require('express');
const router = express.Router();
const pool = require('../databases/mysql.db');

const mysql_string = require('../functions/escape_string.js');

// Endpoint for getting all the records with specififck hadith number
router.get('/:language/collection/:collection/hadith/:number', async (req, res) => {
    let colection = req.params.collection;
    let number = req.params.number;
    let language = req.params.language;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!language.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    var dbname = languages(language);

    if(isNaN(number))
    {
      return  res.status(500).send({ statusCode: 500, statusMessage: 'Hadith number is not an number', message: null, data: null });
    }

    if(!colection.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    try{ 
        const sql = `SELECT * FROM ${dbname} WHERE collection="${colection}" AND hadithNumber=${number}`;
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


// Endpoint for chapter from collection
router.get('/chapter/:collection', async (req, res) => {
    let colection = req.params.collection;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!colection.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    try{ 
        const sql = `SELECT DISTINCT chapter,chapter_number FROM hadithtable WHERE collection="${colection}" ORDER BY chapter_number `;
        const [rows] = await pool.execute(sql);
        res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'Successfully retrieved chapters and chapter ID',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});


// Endpoint for getting all the records
router.get('/:language/collection/:collection/chapter/:number', async (req, res) => {
    let colection = req.params.collection;
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


    if(!colection.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }

    try{ 
        const sql = `SELECT * FROM ${dbname} WHERE collection="${colection}" AND chapter_number=${number} ORDER BY hadithNumber `;
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


// Endpoint for chapter from collection
router.get('/collection', async (req, res) => {
    try{ 
        const sql = `SELECT DISTINCT collection FROM hadithtable ORDER BY collection ASC`;
        const [rows] = await pool.execute(sql);
        res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'Successfully retrieved collection',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});


// Endpoint for chapter from collection
router.get('/search/:language/:search', async (req, res) => {
    var colection = decodeURIComponent(req.params.search);
    
    colection = mysql_string.real_escape(colection);

    let language = req.params.language;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!language.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    var dbname = languages(language);

    try{ 
        const sql = `SELECT * FROM ${dbname} WHERE text LIKE "%${colection}%"  `;
        const [rows] = await pool.execute(sql);
        res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'Successfully searched',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});

function languages(str) {
    switch(str){
        case 'ar':
            return "haditharabic";
        case 'eng':
            return "hadithtable";
        default:
            return "hadithtable"
    }
}

module.exports = router;

