package com.mobile

import android.app.Application
import android.content.Context
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.config.ReactFeatureFlags
import com.facebook.soloader.SoLoader
import com.twiliovoicereactnative.VoiceApplicationProxy
import com.microsoft.appcenter.AppCenter
import com.microsoft.appcenter.distribute.Distribute
import com.facebook.react.ReactNativeHost

class MainApplication : Application(), ReactApplication {
    private val mReactNativeHost: MainReactNativeHost
    private val voiceApplicationProxy: VoiceApplicationProxy

    init {
        mReactNativeHost = MainReactNativeHost(this)
        voiceApplicationProxy = VoiceApplicationProxy(reactNativeHost)
    }

    override public val reactNativeHost: MainReactNativeHost
        get() = mReactNativeHost

    override fun onCreate() {
        super.onCreate()
        voiceApplicationProxy.onCreate()
        // If you opted-in for the New Architecture, we enable the TurboModule system
        ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        SoLoader.init(this, /* native exopackage */ false)
    }

    override fun onTerminate() {
        // Note: this method is not called when running on device, devices just kill the process.
        voiceApplicationProxy.onTerminate()
        super.onTerminate()
    }
}
