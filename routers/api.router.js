const express = require('express');
const router = express.Router();
const pool = require('../databases/mysql.db');

const cheerio = require("cheerio");
const rs = require("request");

// Endpoint for getting all the records
//router.get('/hadith/collection/:collection', async (req, res) => {
//    let colection = req.params.collection;
//    const onlyLettersPattern = /^[A-Za-z]+$/;
//
//    if(!colection.match(onlyLettersPattern)){
//       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
//    }
//    try{ 
//        const sql = `SELECT * FROM hadithtable WHERE collection="${colection}" ORDER BY chapter_number `;
//      const [rows] = await pool.execute(sql);
//        res.send({
//       statusCode: 200,
//        statusMessage: 'Ok',
//        message: 'Successfully retrieved all the hadiths.',
//        data: rows,
//    });
//} catch (err) {
//    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
//}
//});



// Endpoint for getting all the records with specififck hadith number
router.get('/hadith/collection/:collection/hadith/:number', async (req, res) => {
    let colection = req.params.collection;
    let number = req.params.number;
    if(isNaN(number))
    {
      return  res.status(500).send({ statusCode: 500, statusMessage: 'Hadith number is not an number', message: null, data: null });
    }
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!colection.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    try{ 
        const sql = `SELECT * FROM hadithtable WHERE collection="${colection}" AND hadithNumber=${number}`;
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
router.get('/hadith/random', async (req, res) => {
    try{ 
        const sql = `SELECT * FROM hadithtable ORDER BY RAND() LIMIT 1`;
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
router.get('/hadith/chapter/:collection', async (req, res) => {
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
        message: 'Successfully retrieved hadith',
        data: rows,
    });
} catch (err) {
    res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
}
});


// Endpoint for getting all the records
router.get('/hadith/collection/:collection/chapter/:number', async (req, res) => {
    let colection = req.params.collection;
    let number = req.params.number;
    if(isNaN(number))
    {
      return  res.status(500).send({ statusCode: 500, statusMessage: 'chapter number is not an number', message: null, data: null });
    }
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!colection.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    try{ 
        const sql = `SELECT * FROM hadithtable WHERE collection="${colection}" AND chapter_number=${number} ORDER BY hadithNumber `;
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

