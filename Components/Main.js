import React, { PureComponent } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import BasicInfo from './BasicInformation/Main'

export default class MainView extends PureComponent {
    render() {
        return (
            <ScrollView
                style={Styles.main}
                contentContainerStyle={Styles.contentContainer}
                snapToAlignment={'center'}
                alwaysBounceVertical={true}
            >
                <BasicInfo/>
            </ScrollView>
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