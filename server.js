const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
