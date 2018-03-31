import React, { PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View
} from 'react-native'
import { TitleColors } from '../../Util/ProjectColors'
import { remToPixel } from '../../Util/Convertor'
import ContactMe from './ContactInfo'

export default class Main extends PureComponent {
   componentDidMount() {

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
           </View>
       )
   }
}

const Styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    firstTitle: {
        fontSize: remToPixel(1.625),
        fontWeight: 'bold',
        color: TitleColors.H1TitleColor,
        margin: -18.4
    },
    titleDescription: {
        color: TitleColors.H2TitleColor,
        margin:3.2
    }
})