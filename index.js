const { json } = require('express')
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  let info = {
    hadith: "/hadith/:book/:number",
    search: "/search/:search",
    random: "/hadith/random",
    book: "/hadith/:book"
  };
  res.send({info})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})