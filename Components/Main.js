import React, {PureComponent} from 'react'
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native'
import BasicInfo from './BasicInformation/Main'
import DividingLine from './DividingLine'
import BriefTable from './BriefIntroductionTable'
import SkillTable from "./SkillChart/main"
import SkillBar from "./SkillPoint/main"
import Github from "./OpenSourceActivity/main"
import Experience from './Experience'
import Projects from './Timeline/TimeLine'
import SharedProjects from './MyProjects/MyProjects'
import Expansion from './Expansion/Expansion'
import BottomLine from './BottomLine'

export default class MainView extends PureComponent {
    render() {
        return (
            <View>
                <ScrollView
                    style={Styles.main}
                    contentContainerStyle={Styles.contentContainer}
                    alwaysBounceVertical={true}
                    scrollEventThrottle={400}
                >
                    <BasicInfo/>
                    <DividingLine name={"torso"} title={"个人简介"}/>
                    <BriefTable/>
                    <DividingLine name={"like"} title={"技能专长"}/>
                    <SkillTable/>
                    <DividingLine name={"star"} title={"技能评价"}/>
                    <SkillBar/>
                    <DividingLine name={"social-github"} title={"社区经验"}/>
                    <Github/>
                    <DividingLine name={"lightbulb"} title={"个人经验"}/>
                    <Experience/>
                    <DividingLine name={"flag"} title={"项目经历"}/>
                    <Projects/>
                    <DividingLine name={"book"} title={"开源项目"}/>
                    <SharedProjects/>
                    <DividingLine name={"link"} title={"扩展技能"}/>
                    <Expansion/>
                    <BottomLine/>
                </ScrollView>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    contentContainer: {
        marginTop: 48,
        marginHorizontal: 15,
    },
    main: {
        backgroundColor: '#FFFFFF'
    }
})
