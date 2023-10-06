const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../utils/email');
const secretKey = 'kjekrfnjrekhfnerkjhferkjfdnejrskdfhnjfdk';


// Registration
exports.register = (req, res) => {

  // Validate and create user
  User.create(req.body).then(() => {
    res.status(200);
    res.send("user created success");
  }).catch((err) => {
    res.status(400);
    res.send(err);
  });
};

// Login
exports.login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  User.findOne({

    where: {
      email: email,
      password: password,
    }
  }).then(user => {
    if (!user) {
      res.status(401).send('User not found');
      return;
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '120s' });
    res.json({ token });
  })

};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user exists 
    const user = await User.findOne({
      where: {
        email: email,
      }
    });
    console.log(user);


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    //console.log(resetToken);



    var values = { token: resetToken, tokenexp: Date.now() + 3600000 };
    var condition = { where: { email: email } };
    options = { multi: true };


    await User.update(values, condition, options).then(tokens => {
      console.log(tokens);
    }).catch(err => console.log('error: ' + err));;

    // Send an email to the user with a link to reset the password
    const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
    // console.log(resetLink);
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // console.log(req.body);
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find user with reset token and check if it's still valid
    const user = await User.findOne({
      where: {
        token: token,
      }
    });

    // console.log(user);

    if (!user || user.tokenexp < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // console.log(user);
    await User.update(
      { password: newPassword },
      { where: { email: user.email } }
    );

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
