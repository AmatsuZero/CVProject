const QRCode = require('qrcode')
const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.live.com',
            port: 465,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            authMethod: 'login'
        })
        this.successSender = this.transporter.templateSender({
            subject: '【墨刀】{{appName}} 安装文件已就绪',
            html: '你好，' +
            '<strong>{{username}}</strong>，' +
            '{{appName}} 的 iOS 安装文件已生成完毕，请使用 iOS 设备扫码安装： ' +
            '<br/>' +
            ' <img src="{{encodedLink}}" /> ' +
            '<br/> 如二维码无法正常显示，请点击<a href="{{link}}" target="_blank">链接</a>前往安装页面。<br/>',
        }, {
            from: '墨刀 <support@mockingbot.com>',
        })
        this.failSender = this.transporter.templateSender({
            subject: '【墨刀】{{appName}} 安装文件出现错误',
            html: '你好，<strong>{{username}}</strong>，{{appName}} 的 iOS 安装文件出现错误，请尝试重新生成',
        }, {
            from: '墨刀 <support@mockingbot.com>',
        })
    }

    verify() {
        return this.transporter.verify().then(() => true)
    }

    sendMail(to, username, appName, link, isSuccessful) {
        const sender =  isSuccessful ? this.successSender : this.failSender
        return new Promise(((resolve, reject) =>  QRCode.toDataURL(link, (err, encodedLink) => {
            sender({
                to,
            }, {
                username,
                encodedLink,
                appName,
                link,
            }, (err) => {
                if(err) reject(err)
                else resolve(username)
            })
        })))
    }
}

const MailCenter = new MailService()

module.exports = MailCenter
