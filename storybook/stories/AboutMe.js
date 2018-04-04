import BasicInfo from '../../app/BasicInformation/Main'
import React from 'react'
import {
    View
} from 'react-native'

export default AboutMe = () => {
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        }}>
            <BasicInfo/>
        </View>
    )
}
