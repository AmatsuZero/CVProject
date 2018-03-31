import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types'
import { TitleColors } from '../../Util/ProjectColors'
import { remToPixel, equalSize } from "../../Util/Convertor"

export default class SkillChart extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        point: PropTypes.number
    }

    render() {
        const {title, point} = this.props
        const pieData = [point, 100-point].map((value, index) => ({
                value,
                svg:{
                    fill: index === 0 ? TitleColors.H2TitleColor : TitleColors.H3TitleColor
                },
                key: `pie-${index}`
        }))
        return(<View style={Styles.main}>
            <PieChart
                data={pieData}
                style={Styles.pie}
                spacing={10}
                outerRadius={'70%'}
                innerRadius={'95%'}
            />
            <View style={Styles.label}>
                <Text style={Styles.skill}>{title}</Text>
                <Text style={Styles.point}>{point}</Text>
            </View>
        </View>)
    }
}

const Styles = StyleSheet.create({
    main: {
        marginTop: remToPixel(3*1.25)
    },
    pie: {
        width: equalSize(20,2),
        height: equalSize(20,2)
    },
    label:{
        position: 'absolute',
        top: equalSize(20,2)/2-remToPixel(1.6*0.8),
        width:equalSize(20,2),
    },
    skill:{
        color: TitleColors.VerticalSeparatorColor,
        lineHeight: remToPixel(1.6),
        textAlign:'center',
        width:equalSize(20,2)
    },
    point:{
        color: TitleColors.H2TitleColor,
        lineHeight: remToPixel(1.6*0.8),
        textAlign:'center',
        width:equalSize(20,2)
    },
})
