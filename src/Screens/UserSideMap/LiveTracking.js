import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image,
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import haversine from "haversine";
import imagePath from "../../Constants/imagePath";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 31.5204;
const LONGITUDE = 74.3587;

export default function LiveTracking() {
  const ref_Marker = useRef();
  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({});
  const [liveLoc, setLiveLoc] = useState({
    latitude: Number(0),
    longitude: Number(0),
  });
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );
  const calcDistance = (newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };
  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  useEffect(() => {
    let watchID = Geolocation.watchPosition(
      (position) => {
        console.log("LIVE LOCATION==>", position.coords);

        const liveLatitude = position.coords.latitude;
        const liveLongitude = position.coords.longitude;

        const newCoordinate = { liveLatitude, liveLongitude };

        if (Platform.OS === "android") {
          if (ref_Marker) {
            ref_Marker.current.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        setLiveLoc({ latitude: liveLatitude, longitude: liveLongitude });
        setLatitude(liveLatitude);
        setLongitude(liveLongitude);
        setRouteCoordinates(routeCoordinates.concat([newCoordinate]));
        setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate));
        setPrevLatLng(newCoordinate);
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
        interval: 500,
      }
    );
    return () => Geolocation.clearWatch(watchID);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={getMapRegion()}
      >
        {/* <Polyline coordinates={routeCoordinates} strokeWidth={5} /> */}
        <Marker.Animated ref={ref_Marker} coordinate={coordinate} />
        <Marker coordinate={liveLoc}>
          <Image
            source={imagePath.icCurLoc}
            style={{ height: 25, width: 25 }}
          />
        </Marker>
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.bottomBarContent}>
            {parseFloat(distanceTravelled).toFixed(2)} km
          </Text>
          <Text>{calcDistance(prevLatLng)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// class AnimatedMarkers extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: LATITUDE,
//       longitude: LONGITUDE,
//       routeCoordinates: [],
//       distanceTravelled: 0,
//       prevLatLng: {},
//       coordinate: new AnimatedRegion({
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: 0,
//         longitudeDelta: 0,
//       }),
//     };
//   }

//   componentDidMount() {
//     const { coordinate } = this.state;

//     this.watchID = geolocation.watchPosition(
//       (position) => {
//         const { routeCoordinates, distanceTravelled } = this.state;
//         const { latitude, longitude } = position.coords;

//         const newCoordinate = {
//           latitude,
//           longitude,
//         };

//         if (Platform.OS === "android") {
//           if (this.marker) {
//             this.marker._component.animateMarkerToCoordinate(
//               newCoordinate,
//               500
//             );
//           }
//         } else {
//           coordinate.timing(newCoordinate).start();
//         }

//         this.setState({
//           latitude,
//           longitude,
//           routeCoordinates: routeCoordinates.concat([newCoordinate]),
//           distanceTravelled:
//             distanceTravelled + this.calcDistance(newCoordinate),
//           prevLatLng: newCoordinate,
//         });
//       },
//       (error) => console.log(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 1000,
//         distanceFilter: 10,
//       }
//     );
//   }

//   componentWillUnmount() {
//     geolocation.clearWatch(this.watchID);
//   }

//   getMapRegion = () => ({
//     latitude: this.state.latitude,
//     longitude: this.state.longitude,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });

//   calcDistance = (newLatLng) => {
//     const { prevLatLng } = this.state;
//     return haversine(prevLatLng, newLatLng) || 0;
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           style={styles.map}
//           provider={PROVIDER_GOOGLE}
//           showUserLocation
//           followUserLocation
//           loadingEnabled
//           region={this.getMapRegion()}
//         >
//           <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
//           <Marker.Animated
//             ref={(marker) => {
//               this.marker = marker;
//             }}
//             coordinate={this.state.coordinate}
//           />
//         </MapView>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={[styles.bubble, styles.button]}>
//             <Text style={styles.bottomBarContent}>
//               {parseFloat(this.state.distanceTravelled).toFixed(2)} km
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});
