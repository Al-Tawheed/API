const express = require('express');
const router = express.Router();
const pool = require('../databases/mysql.db');



// Endpoint for getting all the records
router.get('/hadith/:collection', async (req, res) => {
    let colection = req.params.collection;
    const onlyLettersPattern = /^[A-Za-z]+$/;

    if(!colection.match(onlyLettersPattern)){
       return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
    }
    try{ 
        const sql = `SELECT * FROM hadithtable WHERE collection="${colection}" `;
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

// Endpoint for creating a new record
router.post('/hadith/new', async (req, res) => {
    var collection = req.body.collection;
    var booknumber = req.body.booknumber;
    var hoofdstuk = req.body.hoofdstuk;
    var hadithnumber = req.body.hadithnumber;
    var transmiter = req.body.transmiter;
    var text = req.body.text;
    var beoordeling = req.body.beoordeling;
    var password = req.body.password;
    const onlyLettersPattern = /^[A-Za-z]+$/;
    

    if(!password === process.env.password)
    {
        return res.status(500).send({ statusCode: 500, statusMessage: 'invalid password', message: null, data: null });
    }

    if(!collection.match(onlyLettersPattern)){
        return res.status(500).send({ statusCode: 500, statusMessage: 'Param Error', message: null, data: null });
     }
     if(isNaN(Number(booknumber))) {
        return res.status(500).send({ statusCode: 500, statusMessage: 'booknumber is not a number', message: null, data: null });
      }

     try{ 
         const sql = `INSERT INTO hadithtable(collection, bookNumber, hoofdstuk, hadithNumber, transmiter, Text, Beoordeling) VALUES ( "${collection}", "${booknumber}", "${hoofdstuk}", "${hadithnumber}", "${transmiter}", "${text}", "${beoordeling}") `;
         await pool.execute(sql);
         res.send({
         statusCode: 200,
         statusMessage: 'Ok',
         message: 'Successfully created new hadith',
     });
 } catch (err) {
     res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
 }

});



module.exports = router;
