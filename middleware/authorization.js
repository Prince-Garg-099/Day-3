

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.usertype === role) {
      next();
    } else {
      res.status(403).send('Permission denied for delete');
    }
  };
}

module.exports = authorizeRole;
