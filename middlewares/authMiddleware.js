
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "No authorization header provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "No token provided"
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Authentication failed"
                });
            } else {
                req.body.userId = decoded.userId; // `userId` as per your JWT payload
                next();
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Authentication failed"
        });
    }
};
