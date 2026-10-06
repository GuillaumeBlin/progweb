import jsonwebtoken from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
    const authorization = req.headers.authorization;
    const [scheme, token] = authorization ? authorization.split(' ') : [];

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required',
        });
    }

    try {
        req.user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
}
