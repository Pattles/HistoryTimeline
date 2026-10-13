const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const expected = process.env.ADMIN_PASSWORD;

    if (expected && req.body.password === expected) {
        return res.json({ success: true });
    }
    res.status(401).json({ success: false });
});

module.exports = router;