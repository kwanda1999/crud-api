const express = require('express');
const mongoose = require('mongoose');
const applicantRoutes = require('./routes/applicant');

const app = express();

mongoose.connect('mongodb://localhost:27017/crud-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/applicant', aplpicantRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server is running on port ${PORT}'));


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory');
const applicantRoutes = require('./routes/applicant');


const app = express();

db.serialize(() => {
    db.run('CREATE TABLE applicants(id INTERGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT,status TEXT)');
});

app.use(express.json());

app.use('applicants', applicantRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server is running on port ${PORT}'));