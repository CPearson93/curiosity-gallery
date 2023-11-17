const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('./config/mongoose.config');
require('./routes/art.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})