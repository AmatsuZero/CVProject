import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'

export default class Github extends PureComponent {
    render() {
        return (
            <View style={Styles.main}>
                <Text>
                    Github
                </Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection:'column',
        marginTop: 10
    }
})