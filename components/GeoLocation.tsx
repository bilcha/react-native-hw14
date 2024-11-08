import React, { useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

type Props = {
  setLocation: (location: string) => void;
  setGeocode: (geoLoc: Location.LocationObject) => void;
};

const GeoLocation: React.FC<Props> = ({ setLocation, setGeocode }) => {
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Дозвіл на локацію",
            "Додаток потребує доступу до вашого місцеположення."
          );
          return;
        }

        const geoLoc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setGeocode(geoLoc);

        const grantedLocation = await Location.reverseGeocodeAsync(
          geoLoc.coords
        );
        const country = grantedLocation[0]?.country || "Невідомо";
        const city = grantedLocation[0]?.city || "Невідомо";
        setLocation(`${country}, ${city}`);
      } catch (error) {
        Alert.alert(
          "Помилка отримання локації",
          "Переконайтеся надано доступ до локації для додатку."
        );
        console.error("Помилка отримання локації:", error);
      }
    };

    fetchLocation();
  }, [setLocation, setGeocode]);

  return null;
};

export default GeoLocation;
