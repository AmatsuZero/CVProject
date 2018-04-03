import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge"
import { Platform } from 'react-native'
import config from '../../config'

class Analysis {
    constructor() {
        this.tracker = new GoogleAnalyticsTracker(config.gaid)
        // The GoogleAnalyticsSettings is static, and settings are applied across all trackers:
        GoogleAnalyticsSettings.setDispatchInterval(20)
        // Setting `dryRun` to `true` lets you test tracking without sending data to GA
        GoogleAnalyticsSettings.setDryRun(true)
        this.tracker.setTrackUncaughtExceptions(true)
    }
    send(name) {
        this.tracker.trackEvent(Platform.OS, name)
    }
    trackScreen() {
        this.tracker.trackScreenView("Home")
    }
    trackError(message) {
        this.tracker.trackException(message, false)
    }
}

const Tracker = new Analysis()

export {
    Tracker
}
