import React, { PureComponent } from 'react'
import {
    Text,
    View,
    Linking,
    StyleSheet
} from 'react-native'
import { TitleColors } from '../utils/ProjectColors'
import { remToPixel } from '../utils/Convertor'
import { Tracker } from "../utils/Analysis"

export default class ContactInfo extends PureComponent {

    constructor() {
        super()
        this.openQQ = this.openQQ.bind(this)
        this.mailTo = this.mailTo.bind(this)
        this.callTo = this.callTo.bind(this)
        this.zhihu = this.zhihu.bind(this)
        this.github = this.github.bind(this)
        this.linkedIn = this.linkedIn.bind(this)
    }

    openQQ() {
        Tracker.send("QQ联系")
        Linking.openURL(`qq:\\741602428`).catch(err => Tracker.trackError(err.stack))
    }

    mailTo() {
        Tracker.send("邮件联系")
        Linking.openURL(`mailto:\\jzh16s@hotmail.com`).catch(err => Tracker.trackError(err.stack))
    }

    callTo() {
        Tracker.send("电话联系")
        Linking.openURL(`phone:\\13905355320`).catch(err => Tracker.trackError(err.stack))
    }

    zhihu() {
        Tracker.send("查看知乎")
        Linking.openURL('https://www.zhihu.com/people/jiang-zhen-hua-86/activities')
            .catch(err => Tracker.trackError(err.stack))
    }

    github() {
        Tracker.send("查看Github")
        Linking.openURL('https://github.com/AmatsuZero')
            .catch(err => Tracker.trackError(err.stack))
    }

    linkedIn() {
        Tracker.send("查看领英")
        Linking.openURL('https://www.linkedin.com/in/jiangzhenhua/')
            .catch(err => Tracker.trackError(err.stack))
    }

    render() {
        return(
            <View style={Styles.main}>
                <View style={Styles.leftContainer}>
                    <Text style={Styles.text}>
                        联系方式
                    </Text>
                    <View style={Styles.blankSpace}>
                    </View>
                    <Text style={Styles.text}>
                        基本信息
                    </Text>
                    <View style={Styles.blankSpace}>
                    </View>
                    <Text style={Styles.text}>
                        社交账号
                    </Text>
                    <View style={Styles.blankSpace}>
                    </View>
                </View>
                <View style={Styles.line}>
                </View>
                <View style={Styles.rightContainer}>
                    <Text style={Styles.text}>
                        {'QQ: '}
                        <Text
                            style={Styles.link}
                            onPress={this.openQQ}
                        >
                            741602428
                        </Text>
                    </Text>
                    <Text style={Styles.text}>
                        {'邮箱: '}
                        <Text
                            style={Styles.link}
                            onPress={this.mailTo}
                        >
                            jzh16s@hotmail.com
                        </Text>
                    </Text>
                    <Text style={Styles.text}>
                        {'手机: '}
                        <Text
                            style={Styles.link}
                            onPress={this.callTo}
                        >
                            13905355320
                        </Text>
                    </Text>
                    <Text style={Styles.text}>
                        出生日期: 1987-7-20
                    </Text>
                    <Text style={Styles.text}>
                        性别: 男
                    </Text>
                    <Text style={Styles.text}>
                        所在城市: 北京
                    </Text>
                    <Text style={Styles.text}>
                        {'知乎账号: '}
                        <Text
                            style={Styles.link}
                            onPress={this.zhihu}
                        >
                            我的页面
                        </Text>
                    </Text>
                    <Text style={Styles.text}>
                        {'Github: '}
                        <Text
                            style={Styles.link}
                            onPress={this.github}
                        >
                            AmatsuZero
                        </Text>
                    </Text>
                    <Text style={Styles.text}>
                        {'LinkedIn: '}
                        <Text
                            style={Styles.link}
                            onPress={this.linkedIn}
                        >
                            Profile
                        </Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    line: {
        width: StyleSheet.hairlineWidth,
        backgroundColor: TitleColors.H3TitleColor,
        alignSelf: 'stretch'
    },
    leftContainer: {
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingRight: remToPixel(3)
    },
    text: {
        color: TitleColors.H3TitleColor,
        lineHeight: remToPixel(1.6)
    },
    blankSpace: {
        height: remToPixel(1.6)*2
    },
    rightContainer: {
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingLeft: 14
    },
    link: {
        color: TitleColors.HyperLink,
        textAlign: 'right',
        lineHeight: remToPixel(1.6)
    }
})
