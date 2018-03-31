import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types'
import { TitleColors } from '../../Util/ProjectColors'
import {remToPixel} from "../../Util/Convertor"

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
                    fill: index === 0 ? TitleColors.H1TitleColor : TitleColors.H2TitleColor
                },
                key: `pie-${index}`
        }))
        return(<View style={Styles.main}>
            <PieChart
                data={pieData}
                style={Styles.pie}
                spacing={0}
                outerRadius={'95%'}
            />
        </View>)
    }
}

const Styles = StyleSheet.create({
    main: {
        flex:1,
        marginVertical: remToPixel(3*1.25)
    },
    pie: {
        width: 100,
        height: 100
    }
})
