const express = require('express');
const cors = require('cors');
require('dotenv').config();
const contacts = require('./routes/contacts');
require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/contacts', contacts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));