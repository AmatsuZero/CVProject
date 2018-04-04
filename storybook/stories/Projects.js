import React from 'react'
import {
    View
} from 'react-native'

import Projects from '../../app/MyProjects/MyProjects'

export default ProjectExperience = () => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'stretch',
            flex:1,
            marginHorizontal:10
        }}>
            <Projects/>
        </View>
    )
}
