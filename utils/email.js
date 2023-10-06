const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'ethereal',
  auth: {
    user: "aiden.kohler@ethereal.email",
    pass: "Rykj9fe7XJpmE748we",
  },
});

// Function to send a password reset email
exports.sendPasswordResetEmail = async (toEmail, resetLink) => {
  const mailOptions = {
    from: "aiden.kohler@ethereal.email",
    to: toEmail,
    subject: 'Password Reset Request',

    text: `Click the following link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${toEmail}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
};
