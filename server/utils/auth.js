const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = {
    authMiddleware: (req, res, next) => {
        let token = req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return res.status(400).json({ message: 'You have no token!' });
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: '2h' });
            req.user = data;
        } catch {
            console.log('Invalid token');
            return res.status(400).json({ message: 'Invalid token!' });
        }

        next();
    },
    signToken: ({ id, email, username }) => {
        return jwt.sign({
            data: {
                id,
                email,
                username
            }
        }, secret, { expiresIn: '2h' })
    }
}