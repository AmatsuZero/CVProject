import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    WebView,
    Platform
} from 'react-native'
import {remToPixel} from "../utils/Convertor"
import Table from './Table'
import { TitleColors } from '../utils/ProjectColors'

export default class Github extends PureComponent {

    webView = null
    render() {
        return (
            <View style={Styles.main}>
                <Text style={Styles.title}>
                    Github:
                </Text>
                <WebView
                    ref={webView => this.webView = webView}
                    style={Styles.heatMap}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={true}
                    source={{uri:"http://ghchart.rshah.org/AmatsuZero"}}
                    onLoad={() => {
                        const script = 'document.body.style.zoom = 1.5;'
                        if (Platform.OS === 'ios' && this.webView) {
                            this.webView.injectJavaScript(script)
                        }
                    }}
                    />
                <View style={Styles.dividingLine}>
                </View>
                <Table/>
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
        fontSize: 15,
        fontWeight: '300'
    },
    heatMap:{
        flex:1,
        height:100,
        alignSelf:'stretch'
    },
    dividingLine:{
        height: 1,
        flex:1,
        backgroundColor: TitleColors.H3TitleColor
    }
})
