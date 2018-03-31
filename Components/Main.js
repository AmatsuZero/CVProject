import React, {PureComponent} from 'react'
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native'
import BasicInfo from './BasicInformation/Main'

export default class MainView extends PureComponent {
    render() {
        return (
            <View>
                <ScrollView
                    style={Styles.main}
                    contentContainerStyle={Styles.contentContainer}
                    alwaysBounceVertical={true}
                >
                    <BasicInfo/>
                </ScrollView>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    contentContainer: {
        marginTop: 48,
        marginHorizontal: 15,
    },
    main: {
        backgroundColor: '#FFFFFF'
    }
})