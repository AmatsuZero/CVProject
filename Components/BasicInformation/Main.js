import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'
import { remToPixel } from '../../Util/Convertor'
import ContactMe from './ContactInfo'
import Icon from 'react-native-vector-icons/Foundation'

export default class Main extends PureComponent {
   constructor() {
       super()
       this.download = this.download.bind(this)
   }

   download() {

   }

   render() {
       return (
           <View style={Styles.main}>
               <Text style={Styles.firstTitle}>
                   姜振华
               </Text>
               <Text style={Styles.titleDescription}>
                   全端开发
               </Text>
               <ContactMe/>
               <TouchableOpacity style={Styles.downloadButton} onPress={this.download}>
                   <Icon name="arrow-down" fontSize={14} color={TitleColors.H3TitleColor}/>
                   <Text style={Styles.button}>
                       下载
                   </Text>
               </TouchableOpacity>
           </View>
       )
   }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    firstTitle: {
        fontSize: remToPixel(1.6875),
        fontWeight: '300',
        color: TitleColors.H1TitleColor,
        marginBottom:remToPixel(0.5),
        fontFamily:'sans-serif'
    },
    titleDescription: {
        color: TitleColors.H2TitleColor,
        marginTop: remToPixel(0.2),
        marginBottom: remToPixel(0.5)
    },
    downloadButton: {
        alignSelf: 'flex-end',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-around'
    },
    button:{
        fontSize:remToPixel(1.25),
        color: TitleColors.H3TitleColor
    }
})