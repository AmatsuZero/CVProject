import {
    GoogleAnalyticsTracker,
    GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge"

class Analysis {
    constructor() {
        this.tracker = new GoogleAnalyticsTracker("UA-116742396-1")
        // The GoogleAnalyticsSettings is static, and settings are applied across all trackers:
        GoogleAnalyticsSettings.setDispatchInterval(10)
        // Setting `dryRun` to `true` lets you test tracking without sending data to GA
        GoogleAnalyticsSettings.setDryRun(true)
    }
    send(name) {
        this.tracker.trackEvent(name)
    }
    trackScreen() {
        this.tracker.trackScreenView("Home")
    }
}

const Tracker = new Analysis()

export {
    Tracker
}
