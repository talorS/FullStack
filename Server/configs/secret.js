const crypto = require('crypto');

module.exports = crypto.randomBytes(256).toString('base64');