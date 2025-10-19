import { useEffect, useState } from "react";
import axios from "axios";

interface GeoLocation {
  isUSA: boolean;
  country: string | null;
  loading: boolean;
  error: string | null;
}

export function useGeoLocation(): GeoLocation {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    isUSA: false,
    country: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGeoLocation = async () => {
      try {
        console.log("[GeoLocation] Starting geolocation fetch...");
        const response = await axios.get("https://ipapi.co/json/");
        const country = response.data.country_code;
        const isUSA = country === "US";

        console.log("[GeoLocation] Location data received:", {
          country,
          isUSA,
          countryName: response.data.country_name,
          city: response.data.city,
          fullData: response.data,
        });

        setGeoLocation({
          isUSA,
          country,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("[GeoLocation] Error fetching location:", error);
        setGeoLocation({
          isUSA: false,
          country: null,
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch location",
        });
      }
    };

    fetchGeoLocation();
  }, []);

  return geoLocation;
}
