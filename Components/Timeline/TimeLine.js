import React, { PureComponent } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Linking
} from 'react-native'
import Timeline from 'react-native-timeline-listview'
import { TitleColors } from '../../Util/ProjectColors'
import { Tracker } from "../../Util/Analysis"

export default class Projects extends PureComponent {
    constructor() {
        super()
        this.data = [
            {
                time: "2015.9",
                title: "iOS开发工程师",
                description: "负责阿大物流车主版/货主版iOS客户端的开发工作。",
                icon: require('./ada.jpeg'),
                imageUrl:'http://pp.myapp.com/ma_icon/0/icon_42366756_1521700103/96',
                downloadUrl:'https://itunes.apple.com/cn/app/阿大物流货主版/id1050412810?mt=8',
                details:[
                    "iOS版客户端从开发到上限的全部开发、上架及后续迭代、维护的工作；",
                    "负责增值服务Hybrid模块的开发到接入；"
                ],
                trackId: "阿大经历"
            },
            {
                time: "2016.3",
                title: "iOS开发工程师",
                description:"负责VC浏览器iOS版的开发工作。",
                icon: require('./sixiang.jpg'),
                imageUrl: "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=fe5c0ec953b5c9ea62f304e5ed02d13d/5366d0160924ab185decd9f53dfae6cd7a890b7d.jpg",
                downloadUrl:"https://itunes.apple.com/us/app/桔子浏览器-好用的浏览器/id1222297538?mt=8",
                details:[
                    "作为VC浏览器iOS端小组负责人参与日常技术方案选型、业务迭代排期、线上异常监控、Bug修复等工作；",
                    "负责VC浏览器内部中后端的开发工作；"
                ],
                trackId: "四象经历"
            },
            {
                time:"2017.4",
                title:"移动端开发工程师",
                description:"负责墨刀移动客户端（基于RN）的开发工作。",
                icon: require('./modao.png'),
                imageUrl: "http://downza.img.zz314.com/apple/iphone/tool-1104/2016-07-25/0f5e8706bc8a6f079d12d31d555a5ada.png",
                downloadUrl:"https://itunes.apple.com/cn/app/mockingbot-墨刀/id1050565468?mt=8",
                details:[
                    "负责RN客户端的开发、迭代和维护、异常监控等工作;",
                    "用Swift对iOS客户端进行重构并上架，客户端的性能和稳定性有了一定的提高；"
                ],
                trackId:"墨刀-移动经历"
            },
            {
                time:"2017.8",
                title:"桌面端开发工程师",
                description:"负责墨刀桌面客户端（基于Electron）的开发工作。",
                imageUrl: "http://downza.img.zz314.com/apple/iphone/tool-1104/2016-07-25/0f5e8706bc8a6f079d12d31d555a5ada.png",
                downloadUrl:"https://s3.cn-north-1.amazonaws.com.cn/modao/darwin/MockingBot.dmg",
                details:[
                    "负责桌面客户端的开发、迭代和维护、异常监控等工作；",
                    "编写自动化工具，实现客户端的自动测试、打包、上传至S3的自动化；",
                    "重写取色器，气团掉原来的Qt版本，实现对客户端体积瘦身；"
                ],
                trackId:"墨刀-桌面经历"
            },
            {
                time:"2017.10",
                title:"设计工具开发工程师",
                description:"负责墨刀Sketch插件的开发工作。",
                imageUrl:"http://procrackworld.com/wp-content/uploads/2017/04/Sketch-43-Crack-Full-Serial-Key-UpdatedNew-Version.jpg",
                downloadUrl:"https://zhuanlan.zhihu.com/p/28325423",
                details:[
                    "负责Sketch插件的开发、迭代和维护、异常监控等工作；",
                    "对原来的Sketch的UI部分通过AppKit重写；",
                    "将原有解析功能完全使用JavaScriptCore+Runtime完全重构；"
                ],
                trackId:"墨刀-设计工具经历"
            }
        ]
        this.onEventPress = this.onEventPress.bind(this)
        this.renderDetail = this.renderDetail.bind(this)
    }

    onEventPress(data) {
        Tracker.send(`${data.trackId}`)
        Linking.openURL(data.downloadUrl)
            .catch(err => Tracker.trackError(err.message))
    }

    renderDetail(rowData, sectionID, rowID) {
        const title = <Text style={Styles.title}>{rowData.title}</Text>
        let desc = null
        if (rowData.description && rowData.imageUrl) {
            desc = (<View style={Styles.descriptionContainer}>
                <Image style={Styles.image} source={{uri: rowData.imageUrl}}/>
                <View style={{flex: 1}}>
                    <Text
                        style={Styles.textDescription}
                        adjustFontSizeToFit={true}
                        allowFontScaling={true}
                    >{rowData.description}</Text>
                    {
                        rowData.details.map((text, index) => (
                            <View style={{
                                flexDirection:'row',
                                alignItems:'flex-start',
                                justifyContent:'center',
                                marginTop: 8
                            }} key={index}>
                                <View style={{
                                    width:5,
                                    height:5,
                                    borderRadius:2.5,
                                    backgroundColor:TitleColors.H1TitleColor,
                                    marginRight: 4,
                                    alignSelf:'center'
                                }}/>
                                <Text style={{
                                    fontSize: 12,
                                    color: "gray",
                                    flex:1
                                }}>{text}</Text>
                            </View>))
                    }
                </View>
            </View>)
        }
        return (
            <View style={{
                justifyContent:'space-between',
                alignItems:'flex-start',
                marginTop: 8
            }}>
                {title}
                {desc}
            </View>
        )
    }

    render(){
        return(
            <View style={Styles.container}>
                <Timeline
                    style={Styles.list}
                    data={this.data}
                    circleSize={30}
                    circleColor='rgba(0,0,0,0)'
                    lineColor={TitleColors.VerticalSeparatorColor}
                    timeContainerStyle={{minWidth:52, marginTop: -5}}
                    timeStyle={{
                        textAlign: 'center',
                        color: TitleColors.H2TitleColor,
                        padding:5,
                        borderRadius:13
                    }}
                    descriptionStyle={{color:'gray'}}
                    options={{
                        style:{paddingTop:5}
                    }}
                    innerCircle={'icon'}
                    onEventPress={this.onEventPress}
                    renderDetail={this.renderDetail}
                />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:"white"
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 20
    },
    textDescription:{
        marginLeft: 10,
        color: "gray",
        fontSize:12.5,
    },
    title:{
        fontSize: 16,
        fontWeight:'bold'
    },
    list:{
        marginTop:20
    },
    descriptionContainer:{
        flexDirection: 'row',
        marginTop: 5
    }
})
