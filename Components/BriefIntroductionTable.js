import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View
} from 'react-native'
import { TitleColors } from '../Util/ProjectColors'

export default class BriefIntroductionTable extends PureComponent {

    render() {
        return(
            <View style={Styles.main}>
                <Text style={Styles.paragraph}>
                    目前就职于墨刀，担任客户端开发。负责移动客户端、桌面客户端、Sketch插件开发的工作。同时也维护墨刀Github开源项目。
                </Text>
                <Text style={Styles.paragraph}>
                    自2015年开始借助iOS开发，至今已有3年开发经验。熟练掌握Swift、Objective-C代码的编写。熟悉大部分iOS开发与调试，理解iOS App结构与运行机制，注重代码质量与执行效率。
                </Text>
                <Text style={Styles.paragraph}>
                    熟悉iOS/macOS库的开发与发布，了解怎样利用CocoaPods/Swift Package Manager/Carthage进行打包与集成，业余时间热爱编写开源代码。熟悉CI、能够编写Jekins/Travis CI等持续集成工具的配置。
                </Text>
                <Text style={Styles.paragraph}>
                    熟悉Git Flow工作流程，有较好的Git使用习惯。有良好的代码风格与清晰的文档结构，遵循团队代码开发规范。
                </Text>
                <Text style={Styles.paragraph}>
                    熟悉各种Hybrid/JS Binding技术。熟悉React-Naive、Electron等框架的开发（本简历为RN版），有丰富的踩坑经验。能够编写原生Node C++ addon， iOS/Android原生package。
                </Text>
                <Text style={Styles.paragraph}>
                    熟悉Web开发。具备开发package、cli的能力。了解如何利用JS编写各个平台的中间层或API Binding。
                </Text>
                <Text style={Styles.tail}>
                    县寻觅一份iOS全职工作，也可以根据具体情况考虑其他相关岗位。
                </Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main:{
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    paragraph: {
        fontWeight:'300',
        color: TitleColors.H2TitleColor,
        marginTop: 14
    },
    tail: {
        color: TitleColors.H1TitleColor,
        marginTop: 14,
        fontWeight:'bold'
    }
})
