import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    WebView
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'
import {remToPixel} from "../../Util/Convertor";

export default class Github extends PureComponent {

    render() {
        return (
            <View style={Styles.main}>
                <Text style={Styles.title}>
                    Github
                </Text>
                <WebView
                    style={Styles.heatMap}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={true}
                    source={{uri:"http://ghchart.rshah.org/AmatsuZero"}}/>
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
        width:300,
        flex:1,
        height:100
    }
})
