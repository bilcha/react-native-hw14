import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const MapScreen = () => {
  const latitude = 50.4501;
  const longitude = 30.5234;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={"Kyiv"}
          description={"I'll wait you here."}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  mapStyle: {
    flex: 1,
  },
});
