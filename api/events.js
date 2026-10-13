const express = require('express');
const router = express.Router();
const Event = require('../db');
const requireAdmin = require('../middleware/requireAdmin');

function validate(body) {
    const { date, title, desc } = body;
    if (!date || !title || !desc) {
        return 'Date, title, and description are required.';
    }
    return null;
}

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;
        const events = await Event.find(date ? { date } : {});
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', requireAdmin, async (req, res) => {
    const problem = validate(req.body);
    if (problem) return res.status(400).json({ error: problem });

    try {
        const { date, title, desc, link } = req.body;
        const event = await Event.create({ date, title, desc, link });
        console.log(`Added event: ${title}`);
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', requireAdmin, async (req, res) => {
    const problem = validate(req.body);
    if (problem) return res.status(400).json({ error: problem });

    try {
        const { date, title, desc, link } = req.body;
        const updated = await Event.findByIdAndUpdate(
            req.params.id,
            { date, title, desc, link },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ error: 'Event not found.' });

        console.log(`Edited event: ${title}`);
        res.json(updated);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid event id.' });
        }
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ error: 'Event not found.' });

        console.log(`Deleted event: ${deleted.title}`);
        res.json({ success: true });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid event id.' });
        }
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;