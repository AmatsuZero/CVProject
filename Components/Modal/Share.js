import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native'
import PropTypes from 'prop-types'
import { TitleColors } from '../../Util/ProjectColors'
import {Tracker} from "../../Util/Analysis"
import Social from '../../Util/Socialization'

export default class SharePanel extends PureComponent {

    static propTypes = {
        close: PropTypes.func
    }

    constructor() {
        super()
        this.shareToQQ = this.shareToQQ.bind(this)
        this.shareToWechat = this.shareToWechat.bind(this)
        this.state = {
            bounceValue: new Animated.Value(0),
            scaleValue: new Animated.Value(0.2)
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.spring(
                this.state.bounceValue, {
                    toValue: 1,
                    friction: 1,
                }
            ),
            Animated.timing(
                this.state.scaleValue, {
                    toValue: 1,
                    easing: Easing.linear
                }
            )
        ]).start(); // 开始执行动画
    }

    shareToQQ() {
        Tracker.send("QQ分享")
        Social.shareQQ()
        this.props.close()
    }

    shareToWechat() {
        Tracker.send("微信分享")
        Social.shareWechat()
        this.props.close()
    }

    render() {
        const animatedStyle = {
            transform: [{
                scale: this.state.bounceValue},
            ]
        }
        const animateTextStyle = {
            transform: [{
                scale: this.state.scaleValue},
            ]
        }
        return(
            <View style={Styles.content}>
                <Text style={{color: TitleColors.H2TitleColor }}>感谢您看完本人简历！</Text>
                <View style={Styles.line}/>
                <Text style={StyleSheet.flatten([Styles.text, {marginVertical: 5}])}>分享到</Text>
                <View style={Styles.buttons}>
                    <TouchableOpacity style={Styles.button} onPress={this.shareToQQ}>
                        <Animated.Image
                            style={[Styles.image, animatedStyle]}
                            source={require('./qq.png')}
                        />
                        <Animated.Text style={StyleSheet.flatten([Styles.text, animateTextStyle, {marginTop:4}])}>QQ</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={Styles.button} onPress={this.shareToWechat}>
                        <Animated.Image
                            style={[Styles.image, animatedStyle]}
                            source={require('./wechat.png')}
                        />
                        <Animated.Text style={StyleSheet.flatten([Styles.text, {marginTop:4}])}>微信</Animated.Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    content:{
        flexDirection:'column',
        alignItems:'center'
    },
    line:{
        height:1,
        backgroundColor: TitleColors.H3TitleColor,
        width: 140,
        marginVertical: 10
    },
    text:{
        color: TitleColors.H3TitleColor,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    image:{
        width:50,
        height:50,
        borderRadius:25,
        borderWidth:0.5,
        borderColor:TitleColors.H3TitleColor
    },
    button:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 15
    }
})
