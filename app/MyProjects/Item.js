import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Linking
} from 'react-native'
import PropTypes from 'prop-types'
import SVG, {
    Path
} from 'react-native-svg'
import { TitleColors } from '../utils/ProjectColors'
import { Tracker } from "../utils/Analysis"

export default class ProjectItem extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        link: PropTypes.string,
        description: PropTypes.string
    }
    render() {
        const {title, description, link, style} = this.props
        return(
            <View style={StyleSheet.flatten([Styles.main, style])}>
                <SVG
                    width="100"
                    height="100"
                >
                    <Path d="M82.063,22.284h-0.006c-0.029-0.874-0.734-1.573-1.612-1.589v-0.003h-3.36l-0.001,60.404l0.001,0.01
		c0,0.9-0.721,1.627-1.617,1.644v0.005l-50.906-0.002c-0.816,0-1.488-0.595-1.619-1.375v-3.602h47.405v-0.003
		c0.011,0,0.021,0.003,0.031,0.003c0.91,0,1.646-0.735,1.646-1.646c0-0.006-0.002-0.012-0.002-0.012l0.002-62.202
		c0-0.91-0.736-1.647-1.646-1.646c-0.01,0-0.02,0.003-0.03,0.003v-0.004L19.583,12.27c-0.91,0-1.646,0.736-1.646,1.646
		c0,0.021,0.006,0.042,0.006,0.063l0,59.237v12.807c-0.001,0.02-0.006,0.039-0.006,0.059s0.005,0.039,0.006,0.059v0.076h0.008
		c0.07,0.845,0.769,1.511,1.632,1.511v0.001l60.833,0.002h0.029v-0.003c0.896-0.016,1.617-0.743,1.617-1.643l-0.001-0.01
		L82.063,22.284z M22.916,23.872c0-0.908,0.736-1.646,1.646-1.646h40.84c0.909,0,1.646,0.738,1.646,1.646h0l-0.001,12.361l0,0.002
		c0,0.91-0.737,1.646-1.646,1.646h0H24.562c-0.909,0-1.646-0.736-1.646-1.646l0.001-12.354
		C22.917,23.878,22.916,23.875,22.916,23.872z" stroke="black"/>
                </SVG>
                <View style={Styles.wrapper}>
                    <Text style={Styles.title} onPress={() => {
                        Tracker.send(`查看项目：${title}`)
                        Linking.openURL(link)
                            .catch(err => Tracker.trackError(err.stack))}
                    }>{title}</Text>
                    <Text style={Styles.description}>{description}</Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main:{
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems:"center",
        marginVertical: 30
    },
    title:{
        color: TitleColors.HyperLink,
        textAlign:'left'
    },
    description:{
        color:TitleColors.H3TitleColor,
        textAlign:'left',
        marginTop:10
    },
    wrapper:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:"stretch"
    }
})
