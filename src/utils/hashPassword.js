const bcrypt = require('bcryptjs')

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(16);
  const hashPassword = bcrypt.hashSync(password, salt);

  return {
    salt: salt,
    hashPassword: hashPassword
  }
}

async function comparePasswords(password, UserPassword) {
  const validPassword = await bcrypt.compare(password, UserPassword);
  return validPassword;
}

module.exports = {
  hashPassword,
  comparePasswords
}