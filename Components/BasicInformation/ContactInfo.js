import React, { PureComponent } from 'react'
import {
    Text,
    View,
    Linking,
    StyleSheet
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'

export default class ContactInfo extends PureComponent {
    render() {
        return(
            <View style={Styles.main}>
                <View style={Styles.container}>
                    <Text style={Styles.text}>
                        联系方式
                    </Text>
                    <Text style={Styles.text}>
                        基本信息
                    </Text>
                    <Text style={Styles.text}>
                        社交账号
                    </Text>>
                </View>
                <View style={Styles.line}/>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    line: {
        width: 1,
        backgroundColor: TitleColors.H3TitleColor
    },
    container: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    text: {
        color: TitleColors.H3TitleColor
    }
})