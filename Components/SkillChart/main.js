import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import PieChart from './SkillChart'

export default class SkillTable extends PureComponent {
    render() {
        return(<View style={Styles.main}>
            <PieChart title={"Objective-C"} point={95}/>
        </View>)
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
    }
})
