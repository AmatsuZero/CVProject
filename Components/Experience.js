import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { remToPixel } from '../Util/Convertor'
import { TitleColors } from '../Util/ProjectColors'
import PropTypes from 'prop-types'

class Item extends PureComponent {

    static propTypes = {
        year: PropTypes.string,
        info: PropTypes.array
    }

    render() {
        const {year, info} = this.props
        return(
            <View style={Styles.item}>
                <Text style={{
                    fontSize: remToPixel(10),
                    fontWeight:'400',
                    color: TitleColors.H2TitleColor
                }}>{year}</Text>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems:'flex-start'
                }}>
                    {info.map((value, index) => (
                        <Text key={index} style={{
                            color: '#888888',
                            lineHeight: remToPixel(1.5),
                            fontWeight:'300',
                            marginLeft: 14,
                        }}>{value}</Text>
                    ))}
                </View>
            </View>
        )
    }
}

export default class Experience extends PureComponent {
    render() {
       return(
           <View style={Styles.container}>
               <Item year={"3"} info={["三年原生开发经验", "了解桌面/移动开发原理", "热衷iOS/Mac开发"]}/>
               <Item year={"2"} info={["两年JS开发经验", "熟悉RN/Electron/插件开发","熟悉各类开发工具调试的使用"]}/>
           </View>
       )
    }
}

const Styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        justifyContent:'space-between'
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical: 15
    }
})
