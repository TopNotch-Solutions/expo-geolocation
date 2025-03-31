import { useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState<{ latitude?: number; longitude?: number }>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserLocation = async () => {
    setLoading(true);
    setErrorMsg(null); // Reset error message

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        setLoading(false);
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (coords) {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });

        console.log("Latitude & Longitude:", latitude, longitude);

        let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      }
    } catch (error) {
      setErrorMsg("Failed to retrieve location.");
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  return { location, errorMsg, loading, getUserLocation };
};

export default useLocation;
