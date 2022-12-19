const dotenv = require('dotenv');
const helmet = require("helmet");
dotenv.config();

const config = require('config');
const PORT = config.get('PORT');

const app = require('./app');

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));