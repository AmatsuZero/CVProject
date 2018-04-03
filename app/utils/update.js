import {
    Platform,
    Alert
} from 'react-native'

import {
    isFirstTime,
    isRolledBack,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update'

import updateConfig from '../../update'
import { Tracker } from "./Analysis"
const { appKey } = updateConfig[Platform.OS]

const switchVer = (hash) => {
    Alert.alert('提示', '简历有更新，是否重启？', [
        {text: '是', onPress: ()=> switchVersion(hash).catch(err => Tracker.trackError(err.stack))},
        {text: '否',},
        {text: '下次启动时', onPress: ()=> switchVersionLater(hash).catch(err => Tracker.trackError(err.stack))},
    ])
}

const update = async () => {
    if (isFirstTime) {
        markSuccess()
        return
    } else if (isRolledBack) {
        Tracker.send("项目被回滚")
    }
    try {
        const info = await checkUpdate(appKey)
        if (info["update"] === true) {
            const hash = await downloadUpdate(info)
            if (hash) {
                switchVer(hash)
            }
        }
    } catch (e) {
        Tracker.trackError(e.message)
    }
}

export default update
