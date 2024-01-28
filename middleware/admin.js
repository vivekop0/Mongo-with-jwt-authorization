const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function adminMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({
            msg: "Unauthorized - Missing Authorization Header",
        });
    }

    const tokenWords = tokenHeader.split(" ");
    const jwtToken = tokenWords[1];

    try {
        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        
        if (decoded.username) {
            next();
        } else {
            res.status(401).json({
                msg: "Unauthorized - Invalid Token",
            });
        }
    } catch (error) {
        res.status(401).json({
            msg: "Unauthorized - Invalid Token",
        });
    }
}

module.exports = adminMiddleware;
