const jwt = require('jsonwebtoken');

const JwtDecoder = (token) => {
    const email = jwt.verify(token, process.env.JWT_SECRET).email;
    return email;
}

module.exports = JwtDecoder;