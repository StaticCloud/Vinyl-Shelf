const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = {
    // Auth middleware for select routes
    authMiddleware: (req, res, next) => {
        // Obtain the auth token either from the query parameter or authorization header
        let token = req.query.token || req.headers.authorization;

        // If there is an authorization token in the header, obtain the token
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        // If no token is provided, return a 400 error
        if (!token) {
            return res.status(400).json({ message: 'You have no token!' });
        }

        // Verify the authenticity of the token
        try {
            const { data } = jwt.verify(token, secret, { maxAge: '2h' });
            // Add a user attribute to the request object and set it's value to the data
            req.user = data;
        } catch {
            return res.status(400).json({ message: 'Invalid token!' });
        }

        // Continue with the request
        next();
    },

    // Sign the token and send it back to the user so they can make auth requests
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