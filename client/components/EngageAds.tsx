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
      // Load SDK with query parameters for channel and publisher
      script.src = `https://ads.engage.so/ads.js?channel=${CHANNEL}&publisher=${PUBLISHER}&debug=${DEBUG ? "true" : "false"}`;
      script.dataset.channel = CHANNEL;
      script.dataset.publisher = PUBLISHER;
      script.dataset.debug = DEBUG ? "true" : "false";

      script.onload = () => {
        if (DEBUG) {
          console.log("[EngageAds] SDK script loaded successfully");
          console.log(
            "[EngageAds] Window object has __engage_ads_sdk:",
            !!window.__engage_ads_sdk,
          );
          console.log("[EngageAds] Global context:", {
            hasEngage: !!window.engage,
            hasEngageAds: !!window.EngageAds,
            allWindowKeys: Object.keys(window).filter(
              (k) =>
                k.toLowerCase().includes("engage") ||
                k.toLowerCase().includes("ad"),
            ),
          });
        }

        // Try different SDK namespaces
        const sdk =
          window.__engage_ads_sdk ||
          (window as any).engage ||
          (window as any).EngageAds;

        if (sdk) {
          if (DEBUG) {
            console.log("[EngageAds] SDK found, initializing...");
          }

          const initMethod = sdk.init || sdk;
          if (typeof initMethod === "function") {
            initMethod({
              channel: CHANNEL,
              publisher: PUBLISHER,
              debug: DEBUG,
              onClose: onAdClose,
            });
          } else if (DEBUG) {
            console.warn("[EngageAds] SDK init is not a function", initMethod);
          }
        } else if (DEBUG) {
          console.warn("[EngageAds] SDK not found on window after script load");
          console.log(
            "[EngageAds] Window object keys:",
            Object.getOwnPropertyNames(window)
              .filter((k) => k.length < 30)
              .sort(),
          );
        }
      };

      script.onerror = () => {
        console.error("[EngageAds] Failed to load SDK from", script.src);
      };

      document.head.appendChild(script);
    };

    loadEngageAdsSDK();

    return () => {
      const script = document.querySelector(
        `script[src="https://ads.engage.so/ads.js"]`,
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
