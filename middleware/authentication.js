const jwt = require('jsonwebtoken');
const secretKey = 'kjekrfnjrekhfnerkjhferkjfdnejrskdfhnjfdk';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  console.log(token);


  if (!token) return res.status(401).send('Access denied.');


  jwt.verify(token, secretKey, (err, user) => {

    if (err) return res.status(403).send('Invalid token.');
    console.log(user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;