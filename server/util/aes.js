const crypto = require('crypto')

const encrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key)
    let crypted = cipher.update(data, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

const decrypt = (encrypted, key) => {
    const decipher = crypto.createDecipher('aes192', key)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    return decrypted
}


export {
    encrypt,
    decrypt
}
