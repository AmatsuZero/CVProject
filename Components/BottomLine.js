import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Linking
} from 'react-native'
import { TitleColors } from '../Util/ProjectColors'
import {Tracker} from "../Util/Analysis"

export default class BottomLine extends PureComponent {
    render() {
        return(
            <View style={Styles.main}>
                <View style={Styles.line}/>
                <Text style={Styles.text}>
                    {`${(new Date()).getFullYear()} `}
                    <Text style={{textDecorationLine:"underline"}} onPress={() => {
                        Tracker.send("看完简历查看我的页面")
                        Linking.openURL('https://github.com/AmatsuZero')
                        .catch(err => Tracker.trackError(err.message))}}>AmatsuZero</Text>
                    <Text>{" & "}</Text>
                    <Text style={{textDecorationLine:"underline"}} onPress={() => {
                        Tracker.send("看完简历查看简历项目")
                        Linking.openURL('https://github.com/AmatsuZero/CVProject.git')
                        .catch(err => Tracker.trackError(err.message))}}>简历项目</Text>
                </Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection:"column",
        alignItems:"center",
        marginVertical: 80
    },
    line:{
        height:0.5,
        backgroundColor: TitleColors.H3TitleColor,
        width: 40,
        marginBottom: 8
    },
    text:{
        color: TitleColors.H3TitleColor,
        textAlign:"center"
    }
})
