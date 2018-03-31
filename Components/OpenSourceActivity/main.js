import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'
import {remToPixel} from "../../Util/Convertor";

Image.prefetch('http://ghchart.rshah.org/AmatsuZero')

export default class Github extends PureComponent {
    render() {
        return (
            <View style={Styles.main}>
                <Text style={Styles.title}>
                    Github
                </Text>
                <Image
                    style={Styles.heatMap}
                    source={{uri: "http://ghchart.rshah.org/AmatsuZero"}}/>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection:'column',
        marginTop: 10,
        justifyContent:'space-between'
    },
    title:{
        marginVertical:5,
        lineHeight:remToPixel(1.6),
        fontSize: 15
    },
    heatMap:{
        alignSelf:'stretch',
        flex:1,
        height:100
    }
})