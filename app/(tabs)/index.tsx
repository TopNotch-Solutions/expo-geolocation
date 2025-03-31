import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import useLocation from "@/hooks/useLocation";

export default function Index() {
  const { location, errorMsg, loading, getUserLocation } = useLocation();

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>User Location</Text>
      <Text style={styles.text}>
        Click the button below to get your location. Please don't forget to leave a like and subscribe to Paulus' channel to encourage more content on mobile development.
      </Text>

      <TouchableOpacity style={styles.button} onPress={getUserLocation} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Fetching..." : "Get Location"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} />}

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {location?.latitude !== undefined && location?.longitude !== undefined ? (
  <Text style={styles.locationText}>
    Latitude: {location.latitude} {"\n"}
    Longitude: {location.longitude}
  </Text>
) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textHeader: {
    fontSize: 24,
    color: "#fff",
  },
  text: {
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    width: "95%",
    height: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  locationText: {
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
});
