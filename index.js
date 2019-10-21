const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "https://frontend-intervieww.herokuapp.com",
    {
        useMongoClient: true
    }, () => console.log('Database connected!')
)

const registerUser = require('./routes/registerUser');
const feedBack = require('./routes/feedback');
app.use('/users', registerUser);
app.use('/feedback', feedBack);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));



