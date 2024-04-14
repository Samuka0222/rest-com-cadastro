const bcrypt = require('bcryptjs')

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(16);
  const hashPassword = bcrypt.hashSync(password, salt);

  return {
    salt: salt,
    hashPassword: hashPassword
  }
}

module.exports = {
  hashPassword
}