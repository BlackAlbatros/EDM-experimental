package com.fireappbuilder.android.MuziqRocksEDM;

import android.app.Application;
import com.engage.engageadssdk.EMAdsModule;
import com.engage.engageadssdk.EMAdsModuleInputBuilder;

public class MuziqApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize the Engage Ads SDK
        EMAdsModule.init(new EMAdsModuleInputBuilder().apply {
            isGdprApproved = true;
            publisherId = "YOUR_PUBLISHER_ID";
            channelId = "YOUR_CHANNEL_ID";
            context = getApplicationContext();
            isDebug = false;
            bundleId = null;
            isAutoPlay = true;
        });
    }
}
