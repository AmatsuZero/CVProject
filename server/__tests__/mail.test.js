const MailService = require('../service/mail')

describe('邮件服务测试', () => {

    test('验证测试', () => {
        expect.assertions(1)
        return MailService.verify().resolves.toBeTruthy()
    })

    test('发送测试', () => {
        expect.assertions(1)
        return expect(MailService.sendMail('741602428@qq.com', "Daubert", "测试", "https://community.nodemailer.com/2-0-0-beta/templating/", true)).resolves.toBe('Daubert')
    })
})
