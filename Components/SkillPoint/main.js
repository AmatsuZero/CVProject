import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'
import Skill from "./PointBar";
import { remToPixel } from '../../Util/Convertor'

export default class SkillBar extends PureComponent {
    render() {
        return(
            <View style={Styles.main}>
                <Text style={Styles.title}>
                    技能描述
                </Text>
                <View style={Styles.barContainer}>
                    <Skill name={"Swift"} number={8}/>
                    <Skill name={"Objective-C"} number={8}/>
                    <Skill name={"JavaScript"} number={8}/>
                    <Skill name={"React Native"} number={8}/>
                    <Skill name={"Electron"} number={7}/>
                    <Skill name={"HTML/CSS"} number={7}/>
                </View>
                <View style={Styles.brief}>
                    <Text style={{
                        marginVertical:10,
                        lineHeight:remToPixel(1.6),
                        fontSize: 15
                    }}>
                        能力简述
                    </Text>
                    <Text style={Styles.text}>有良好的代码编写规范，</Text>
                    <Text style={Styles.text}>对应用工作机制较熟悉，</Text>
                    <Text style={Styles.text}>有良好的程序开发能力，</Text>
                    <Text style={Styles.text}>积攒了丰富的调试经验，</Text>
                    <Text style={Styles.text}>热衷于用代码解决问题，</Text>
                    <Text style={Styles.text}>熟练使用版本控制工具，</Text>
                    <Text style={Styles.text}>倾力于开源与技术分享，</Text>
                    <Text style={Styles.text}>能够阅读英文技术文档，</Text>
                    <Text style={Styles.text}>关注科技行业前沿技术。</Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection: 'column'
    },
    title: {
        marginVertical:20,
        lineHeight: remToPixel(1.4),
        color: TitleColors.H2TitleColor
    },
    barContainer:{
        flexDirection:'column',
        justifyContent: 'space-between'
    },
    brief:{
        flexDirection:'column'
    },
    text:{
        marginBottom: 0.2,
        lineHeight: remToPixel(1.5)
    }
})
