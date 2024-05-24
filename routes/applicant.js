
const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');


router.post('/', async (req, res) => {
    try {
        const applicant = new Applicant(req.body);
        await applicant.save();
        res.status(201).send(applicant);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) {
            return res.status(404).send();
        }
        res.send(applicant);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!applicant) {
            return res.status(404).send();
        }
        res.send(applicant);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndDelete(req.params.id);
        if (!applicant) {
            return res.status(404).send();
        }
        res.send(applicant);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
