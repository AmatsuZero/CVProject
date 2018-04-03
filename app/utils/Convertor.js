import {
    Dimensions
} from 'react-native'

const remToPixel = (rem, defaultFontSize = 14) => {
    return rem * defaultFontSize
}

const equalSize = (spacing, fold) => {
    return (Dimensions.get('window').width - spacing*(fold+1))/fold
}

export {
    remToPixel,
    equalSize
}