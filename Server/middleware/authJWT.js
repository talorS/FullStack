const jwt = require("jsonwebtoken");
const accessTokenSecret = require('../configs/secret');

const verifyToken = (req, res, next) => {
  
  const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user.data; //for authorization (role access)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = verifyToken;