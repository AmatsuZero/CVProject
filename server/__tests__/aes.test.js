const { encrypt, decrypt } = require('../util/aes')

test('加密解密测试', () => {
    const data = 'Hello, this is a secret message!'
    const key = 'Password!'
    const encrypted = encrypt(data, key)
    const decrypted = decrypt(encrypted, key)

    console.log('Plain text: ' + data)
    console.log('Encrypted text: ' + encrypted)
    console.log('Decrypted text: ' + decrypted)
})
