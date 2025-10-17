import { useEffect } from "react";

interface EngageAdsProps {
  onAdClose?: () => void;
}

export function EngageAds({ onAdClose }: EngageAdsProps) {
  const CHANNEL = "62570352";
  const PUBLISHER = "a8ce40dc";
  const DEBUG = true;

  useEffect(() => {
    if (DEBUG) {
      console.log("[EngageAds] Loading ads for USA visitor", {
        channel: CHANNEL,
        publisher: PUBLISHER,
      });
    }

    const loadEngageAdsSDK = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://ads.engage.so/ads.js";
      script.dataset.channel = CHANNEL;
      script.dataset.publisher = PUBLISHER;
      script.dataset.debug = DEBUG ? "true" : "false";

      script.onload = () => {
        if (DEBUG) {
          console.log("[EngageAds] SDK loaded successfully");
        }

        if (window.__engage_ads_sdk) {
          window.__engage_ads_sdk.init({
            channel: CHANNEL,
            publisher: PUBLISHER,
            debug: DEBUG,
            onClose: onAdClose,
          });
        }
      };

      script.onerror = () => {
        console.error("[EngageAds] Failed to load SDK");
      };

      document.head.appendChild(script);
    };

    loadEngageAdsSDK();

    return () => {
      const script = document.querySelector(
        `script[src="https://ads.engage.so/ads.js"]`
      );
      if (script) {
        script.remove();
      }
    };
  }, [onAdClose]);

  return (
    <div
      id="engage-ads-container"
      className="w-full h-full bg-black flex items-center justify-center"
    >
      <div className="text-white text-center">
        <p className="text-lg mb-4">Loading Advertisement...</p>
        <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __engage_ads_sdk?: {
      init?: (config: {
        channel: string;
        publisher: string;
        debug: boolean;
        onClose?: () => void;
      }) => void;
    };
  }
}
