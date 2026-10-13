module.exports = function requireAdmin(req, res, next) {
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected || req.headers['x-admin-password'] !== expected) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};