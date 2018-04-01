import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import Item from './Item'

export default class Expansion extends PureComponent {
    render() {
        return(
            <View style={Styles.main}>
                <Item name={"前端"} icon={"html5"}/>
                <Item name={"设计"} icon={"paint-bucket"}/>
                <Item name={"翻译"} icon={"pencil"}/>
                <Item name={"桌面"} icon={"folder"}/>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"wrap",
        marginTop: 40
    }
})
