package com.mobile

import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.twiliovoicereactnative.VoiceActivityProxy

class MainActivity : ReactActivity() {

    private val activityProxy = VoiceActivityProxy(
        this,
        { permission ->
            when {
                Manifest.permission.RECORD_AUDIO == permission -> {
                    Toast.makeText(
                        this@MainActivity,
                        "Microphone permissions needed. Please allow in your application settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
                (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) &&
                        Manifest.permission.BLUETOOTH_CONNECT == permission -> {
                    Toast.makeText(
                        this@MainActivity,
                        "Bluetooth permissions needed. Please allow in your application settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
                (Build.VERSION.SDK_INT > Build.VERSION_CODES.S_V2) &&
                        Manifest.permission.POST_NOTIFICATIONS == permission -> {
                    Toast.makeText(
                        this@MainActivity,
                        "Notification permissions needed. Please allow in your application settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        })

    class MainActivityDelegate(activity: ReactActivity, mainComponentName: String) :
            ReactActivityDelegate(activity, mainComponentName) {

            override fun createRootView(): ReactRootView {
                val reactRootView = ReactRootView(context)
                setReactRootViewFlags(reactRootView)
                return reactRootView
            }

            private fun setReactRootViewFlags(reactRootView: ReactRootView) {
                try {
                    val field = ReactRootView::class.java.getDeclaredField("mUseSurface")
                    field.isAccessible = true
                    field.setBoolean(reactRootView, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
            return MainActivityDelegate(this, mainComponentName)
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityProxy.onCreate(savedInstanceState)
    }

    override fun onDestroy() {
        activityProxy.onDestroy()
        super.onDestroy()
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        activityProxy.onNewIntent(intent)
    }

    override fun getMainComponentName(): String {
        return "Mobile"
    }
}
