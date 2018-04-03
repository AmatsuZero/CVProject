import { registerApp, shareToSession } from 'react-native-wechat'
import { shareText, shareScene } from 'react-native-qqsdk'
import { Tracker } from "./Analysis"
import config from "../../config"

let isRegistered = false

export default class Socialization {
    static shareQQ() {
        if (!isRegistered) {
            registerApp(config.wechat)
            isRegistered = true
        }
        try {
            shareToSession("", {
                type:"text",
                title:"姜振华的简历项目",
                description:"这是姜振华的简历项目"
            })
        } catch (e) {
            Tracker.trackError(e.message)
        }
    }

    static shareWechat() {
        shareText("https://github.com/AmatsuZero/CVProject", shareScene.QQ)
            .catch(err => Tracker.trackError(err.stack))
    }
}
