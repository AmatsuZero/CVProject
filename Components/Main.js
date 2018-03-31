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

export default class MainView extends PureComponent {
    render() {
        return (
            <View>
                <ScrollView
                    style={Styles.main}
                    contentContainerStyle={Styles.contentContainer}
                    alwaysBounceVertical={true}
                >
                    <BasicInfo/>
                    <DividingLine name={"torso"} title={"个人简介"}/>
                    <BriefTable/>
                    <DividingLine name={"like"} title={"技能专长"}/>
                    <SkillTable/>
                    <DividingLine name={"star"} title={"技能评价"}/>
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
