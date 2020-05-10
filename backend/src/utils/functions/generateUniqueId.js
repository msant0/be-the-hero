const crypto = require('crypto')

exports.generateUniqueId = function (){
    return crypto.randomBytes(4).toString('HEX')
}
