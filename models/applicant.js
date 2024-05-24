
const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;
