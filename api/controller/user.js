const constant = require('../../config/constant');
const jwt = require('jsonwebtoken');


exports.fakeLoginApi = async function (req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).json({
      status: 400,
      message: "Empty payload not allowed."
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  if (email == 'admin@admin.com' && password == 'admin') {
    const user = {
      name: 'Administrator',
      email: 'admin@admin.com',
      username: 'admin',
      role: 'admin',
      organization: 'Pro Code Programming',
      createdBy: 'Pro Code Programming',
      loggedInAt: new Date()
    };

    const expirationSeconds = 60 * 60 * 24 * 30 * 12 * 1; // seconds * minutes * hour * days * months * year
    const token = jwt.sign(user, constant.PASSWORD, {
      expiresIn: expirationSeconds,
    });

    return res.json({
      data: {
        ...user,
        token: token,
      },
      status: 200,
      message: "Login successfully"
    })
  }
  return res.status(400).json({
    status: 400,
    message: 'Invalid credentials found. Please used valid credentials'
  });
}

exports.fakeUserProfile = async function (req, res, next) {
  return res.status(200).json({
    status: 200,
    message: 'User profile successfully fetched.',
    data: req.user
  });
}