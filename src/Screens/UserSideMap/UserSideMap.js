import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  LogBox,
  Platform,
  Alert,
  Animated
} from "react-native";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import MapViewDirections from "react-native-maps-directions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as geolib from "geolib";
import { getPreciseDistance, isPointWithinRadius } from "geolib";
import BottomSheet from "reanimated-bottom-sheet";
// import Animated, { set } from "react-native-reanimated";
import { GOOGLE_MAP_KEY } from "../../Constants/GoogleMapKey";
import imagePath from "../../Constants/imagePath";
import Theme from "../../Utils/Theme";
import { AirbnbRating } from "react-native-ratings";
import Header from "../../Components/Headers/Headers";
import { db, auth } from "../../Utils/Exports";
import Modal from "react-native-modal";
import styles from "./Style";
import PlayRecordingModal from "../../Components/Modals/PlayRecordingModal";
import LoaderModal from "../../Components/Modals/LoaderModal";
import RBSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const screen = Dimensions.get("window");
const Aspect_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * Aspect_RATIO;

const UserSideMap = ({ navigation, route }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [postImageURL, setPostImageURL] = useState("");
  const [postRecordingURL, setPostRecordingURL] = useState("");
  const [isFetch, setIsFetch] = useState(false);

  const [isArrivedAtAnyPostModal, setIsArrivedAtAnyPostModal] = useState(false);
  const [isArrivedAtAnyPostData, setIsArrivedAtAnyPostData] = useState(null);
  // console.log(`${isArrivedAtAnyPost} == ${ind}`);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQuiz, setModalQuiz] = useState(false);
  const [StartingAddress, setStartingAddress] = useState([]);
  const [EndingAddress, setEndingAddress] = useState([]);
  const [lineVisible, setLineVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [city, setcity] = useState([]);
  const [pickupArrival, setpickupArrival] = useState(false);
  const [description, setDescription] = useState("");
  const [state1, Setstate1] = useState({
    region: {
      latitude: Number(0),
      longitude: Number(0),
    },
  });
  const [newRegion, setNewRegion] = useState(null);
  const [pickupCordss, SetpickCordss] = useState({
    latitude: Number(0),
    longitude: Number(0),
  });
  const [customMarkerCords, SetcustomMarkerCords] = useState([]);
  const [destinationCordss, SetdestinationCordss] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [distance, setDistance] = useState("");
  const [range, setRange] = useState("");
  const [lat, setLat] = useState(0);
  const [position, setPosition] = useState({
    latitude: Number(0),
    longitude: Number(0),
  });
  const [long, setLong] = useState(0);
  const [markerModel, setmarkerModel] = useState(false);
  const [alllatitude, setalllatitude] = useState([]);
  const [alllongitude, setalllongitude] = useState();
  const [remove, setremove] = useState(0);
  const [markerDistance, setmarkerDistance] = useState(null);
  const [namePost, setnamePost] = useState("");
  const [descPost, setdescPost] = useState("");
  const [indPost, setindPost] = useState(1);
  const [markerPhotoModal, setmarkerPhotoModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isBtmSheetClose, setIsBtmSheetClose] = useState(false);
  const mapRef = useRef();
  const bs = React.createRef();
  const ref_MapType_RBSheet = useRef();

  const fall = new Animated.Value(1);

  const [mapType, setMapType] = useState("standard");

  const MAP_TYPES = [
    {
      key: 1,
      icon: require("../../Assets/standard.jpg"),
      value: "standard",
    },
    {
      key: 2,
      icon: require("../../Assets/satellite.jpg"),
      value: "satellite",
    },
  ];
  //////////////////////      Permissions      /////////////////////////////
  async function requestPermissions() {
    let permissionCheck = "";
    permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (permissionCheck === RESULTS.DENIED) {
      const permissionRequest = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      permissionRequest === RESULTS.GRANTED
        ? console.warn("Location permission granted.")
        : console.warn("Location perrmission denied.");
    }
  }
  // const requestPermissions = async () => {
  //   let permissionCheck = "";
  //   if (Platform.OS === "ios") {
  //     permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  //     if (permissionCheck === RESULTS.DENIED) {
  //       const permissionRequest = await request(
  //         PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //       );
  //       permissionRequest === RESULTS.GRANTED
  //         ? console.warn("Location permission granted.")
  //         : console.warn("Location perrmission denied.");
  //     }
  //   }

  //   if (Platform.OS === "android") {
  //     permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  //     if (permissionCheck === RESULTS.DENIED) {
  //       const permissionRequest = await request(
  //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //       );
  //       permissionRequest === RESULTS.GRANTED
  //         ? console.warn("Location permission granted.")
  //         : console.warn("Location perrmission denied.");
  //     }
  //   }
  // };

  let Point = geolib.isPointWithinRadius(
    { latitude: position.latitude, longitude: position.longitude },
    {
      latitude: pickupCordss?.latitude,
      longitude: pickupCordss?.longitude,
    },
    50
  );
  const PickupAr = () => {
    setpickupArrival(Point);
  };
  {
    Point === true ? console.warn("Arrived At Location") : "Yooo";
  }
  let isArrivedAtAnyPost = markers
    ?.map((i, ind) => {
      return isPointWithinRadius(
        { latitude: position.latitude, longitude: position.longitude },
        {
          latitude: i?.customMarkerCords.latitude,
          longitude: i?.customMarkerCords.longitude,
        },
        30
      );
    })
    .findIndex((i) => i === true);
  // console.log(isArrivedAtAnyPost);
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => {
        console.log("Geolocation Error" + error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 100 }
    );
  };
  const showAlert = (loc) => {
    Alert.alert("LIVE LOCATION", JSON.stringify(loc, 0, 4));
  };
  const setIsNotifiedInDB = async (pid) => {
    const refPost = db
      .ref("Users/" + UserId)
      .child("Posts")
      .child(PostId)
      .child("Custom-Coords")
      .child(pid);
    await refPost.update({
      isNotified: true,
    });
  };
  const watchAndClearPosition = () => {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        // console.log(1222);
        // console.log(isArrivedAtAnyPost);
        // console.log(1222);
        // alert(isArrivedAtAnyPost);
        console.log("LIVE LOCATION", pos.coords);
        const { latitude, longitude } = pos.coords;
        // isArrivedAtAnyPost !== -1 &&
        markers.map((i, ind) => {
          if (isArrivedAtAnyPost === ind) {
            if (i?.isNotified === undefined) {
              // showAlert(pos.coords);
              setIsNotifiedInDB(i?.uid).then(() => {
                setIsArrivedAtAnyPostModal(true);
                setIsArrivedAtAnyPostData(i);
                setPostImageURL(i?.PostImage);
                setPostRecordingURL(i?.PostRecording);
              });
            }
          }
        });
        setPosition({
          latitude: latitude,
          longitude: longitude,
        });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
        distanceFilter: 0.55,
        interval: 200,
      }
    );
    return watchId;
  };
  // const liveLocation = async () => {

  // };

  useEffect(() => {
    if (!isFirstLaunch) {
      const intervall = setInterval(() => {
        PickupAr();
      }, 1000);
      return () => clearInterval(intervall);
    }
  });
  useEffect(() => {
    let id;
    if (Platform.OS === "android") {
      requestPermissions().then(() => {
        id = watchAndClearPosition();
      });
    } else if (Platform.OS === "ios") {
      Geolocation.requestAuthorization("always").then(() => {
        id = watchAndClearPosition();
      });
    }
    return () => Geolocation.clearWatch(id);
  }, [isArrivedAtAnyPost]);
  useEffect(() => {
    requestPermissions();
    getUserLocation();
    // liveLocation();
    LogBox.ignoreLogs([
      "MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS",
    ]);
    bs.current.snapTo(0);
  }, []);
  useEffect(async () => {
    // await getCity();
    // await getcord();
    fetchPostDetailViaPostID();
  }, []);

  const onMapReady = () => {
    mapRef.current.animateToRegion({
      ...postDetailsFromDB?.StartingPoint,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    getUserLocation();
    // liveLocation();
  };

  // const getCity = async () => {
  //   const currentUid = auth.currentUser.uid;
  //   const ref1 = db.ref("Users/" + currentUid).child("/Coords");
  //   const ref = db.ref("Users/" + currentUid).child("/Coords");
  //   const Stp = db.ref("Users/" + currentUid).child("/Coords");

  //   const list = [];
  //   const list1 = [];
  //   const cityy = [];
  //   const desc = [];
  //   const stp = [];
  //   ref.on("value", (snapshot) => {
  //     if (!snapshot.exists) {
  //       console.warn("no dataaa");
  //     } else {
  //       if (snapshot.val()) {
  //         // Alert.alert("ref", JSON.stringify(snapshot.val(), 0, 4));

  //         const { StartingAddress, EndingAddress } = snapshot.val();
  //         const item1 = Object.values({ StartingAddress });
  //         const item2 = Object.values({ EndingAddress });
  //         list.push(item1);
  //         list1.push(item2);
  //         setStartingAddress(list);
  //         setEndingAddress(list1);
  //       } else {
  //       }
  //     }
  //   });
  //   ref1.on("value", (snapshot) => {
  //     if (!snapshot.exists) {
  //       console.warn("no dataaa");
  //     } else {
  //       if (snapshot.val()) {
  //         // Alert.alert("ref1", JSON.stringify(snapshot.val(), 0, 4));

  //         const { City } = snapshot.val();
  //         const { Description } = snapshot.val();

  //         const items = Object.values({ City });
  //         setDescription(Description);
  //         cityy.push(items);
  //         setcity(cityy);
  //       } else {
  //       }
  //     }
  //   });

  //   Stp.on("value", (snapshot) => {
  //     if (!snapshot.exists) {
  //       console.warn("no dataaa");
  //     } else {
  //       if (snapshot.val()) {
  //         // Alert.alert("Stp", JSON.stringify(snapshot.val(), 0, 4));
  //         const { StartingPoint } = snapshot.val();
  //         const { EndingPoint } = snapshot.val();

  //         var cords = EndingPoint;
  //         var cord = StartingPoint;
  //         SetpickCordss(cord);
  //         SetdestinationCordss(cords);
  //         console.log("PickUp Coords  ", pickupCordss);
  //         console.log(" Destination coords", destinationCordss);
  //         setcpoy(true);
  //       } else {
  //       }
  //     }
  //   });

  //   const ref3 = db.ref("Users/" + currentUid).child("/Custom-Coords");
  //   ref3.on("value", async (snapshot) => {
  //     // let data = [];
  //     if (!snapshot.exists) {
  //       console.warn("no dataaa");
  //     } else {
  //       if (snapshot.val()) {
  //         ref3.once("value").then(function (snapshot1) {
  //           const data = [];
  //           snapshot1.forEach(async (child) => {});
  //         });
  //       } else {
  //       }
  //     }
  //   });
  // };

  // const getcord = async () => {
  //   var arraycords = []; // clear existing messages
  //   let keys = [];
  //   const currentUid = auth.currentUser.uid;
  //   let ref = db
  //     .ref("Users/" + currentUid)
  //     .child("/Coords")
  //     .child(PostId)
  //     .child("/Custom-Coords");
  //   ref.orderByKey().once("value", (snapshot) => {
  //     if (snapshot.exists()) {
  //       const customCoordinates = snapshot.val();
  //       // customCoordinates?.map((item, index) => {
  //       //   // customMarkerCords.push(item);
  //       // });
  //     }
  //   });
  // };
  const [postMarkerLocations, setPostMarkerLocations] = useState([]);
  const [postDetailsFromDB, setPostDetailsFromDB] = useState([]);
  const fetchPostDetailViaPostID = async () => {
    const ref = db
      .ref("Users/" + UserId)
      .child("Posts")
      .child(PostId);
    ref.once("value", (snapshot) => {
      const customCoordinates = [];
      const marker = [];
      const customLatLong = [];
      if (snapshot.exists()) {
        const allPosts = snapshot.val();
        const { "Custom-Coords": Custom_Coords, ...remainigPostData } =
          allPosts;
        Object.keys(Custom_Coords).forEach((item) => {
          customCoordinates.push(Custom_Coords[item]);
        });
        setPostDetailsFromDB(remainigPostData);

        SetpickCordss(remainigPostData?.StartingPoint);
        SetdestinationCordss(remainigPostData?.EndingPoint);
      }

      customCoordinates.map((item, index) => {
        marker.push(item);
        customLatLong.push({
          latitude: item?.customMarkerCords?.latitude,
          longitude: item?.customMarkerCords?.longitude,
        });
      });
      setMarkers(marker);
      setPostMarkerLocations(customLatLong);
      setIsFetch(true);
    });
  };
  const onChangeValue = (region) => {
    setNewRegion(region);
    Setstate1(region);
    setDistance(c);
    setRange(isWithinRange);
  };
  const c = getPreciseDistance(
    { latitude: position.latitude, longitude: position.longitude },
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    }
  );

  const isWithinRange = markers?.map((i, ind) => {
    return getPreciseDistance(
      { latitude: position.latitude, longitude: position.longitude },
      {
        latitude: i?.customMarkerCords.latitude,
        longitude: i?.customMarkerCords.longitude,
      }
    );
  });

  // let custimL = customRange[customRange.length - 1];

  const markermodalcall = (ind) => {
    setmarkerModel(!markerModel);
    setremove(ind);
  };
  const postDetail = (i, ind) => {
    // alert(JSON.stringify(i, 0, 4));
    setnamePost(i.PostName);
    setdescPost(i.PostDesc);
    setPostImageURL(i?.PostImage);
    setPostRecordingURL(i?.PostRecording);
    setindPost(ind + 1);
    console.log("postDATA===>", i);
  };
  const navigateToStartPoint = () => {
    mapRef.current.animateToRegion({
      ...postDetailsFromDB?.StartingPoint,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    bs.current.snapTo(1);
    setIsBtmSheetClose(true);
    // getcord();
  };
  const checkValid = () => {
    if (Object.keys(destinationCordss).length === 0) {
      showError("Please enter your Destination location");
      return false;
    }
    if (Object.keys(pickupCordss).length === 0) {
      showError("Please enter your Start location");
      return false;
    }
    return true;
  };
  const onDone = async () => {
    //
    const isValid = checkValid();
    if (isValid) {
      setLineVisible(true);
      // setModalVisible(!modalVisible);
      setVisible(true);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // This function is called here but not declare or initilaized in this file
    // ///////////////////////////////////////////////////////////////////////////////
    // addItem(
    //   pickupCordss,
    //   destinationCordss,
    //   city,
    //   inputcity,
    //   inputcity1,
    //   namehunt,
    //   description
    // );
  };
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "10%" }}>
          <Image
            source={require("../../Assets/mapPin.png")}
            style={styles.imgMarker}
          />
        </View>
        <View style={{ width: "85%" }}>
          <Text style={styles.txtTitle}>{postDetailsFromDB?.City}</Text>
          <View>
            <Text style={styles.txtCreatedBy}>
              created by{" "}
              <Text style={{ ...styles.txtCreatedBy, color: "#1596F3" }}>
                {/* {Username}{' '} */}
                724.ONE's Developer
              </Text>
            </Text>
            <View style={{ alignSelf: "flex-start" }}>
              <AirbnbRating size={15} showRating={false} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          width: "85%",
          alignSelf: "center",
          flex: 1,
          paddingBottom: Theme.hp("1.3%"),
          marginTop: Theme.hp("1%"),
        }}
      >
        <Text
          style={{
            fontSize: Theme.RFPercentage(2.2),
            color: "#959494",
            width: "100%",
          }}
        >
          {postDetailsFromDB?.Description}
        </Text>
        {/* <Text style={styles.txtPosts}>3 POSTS</Text> */}
        <View>
          <Text style={styles.txtAddress}>Hunt Start Point</Text>

          <View style={styles.boxWrap}>
            <Text style={styles.txtStatus}>
              {postDetailsFromDB?.StartingAddress}
            </Text>
            <Image
              source={require("../../Assets/mapPin.png")}
              style={styles.ImgPin}
            />
          </View>
        </View>
        <View>
          <Text style={styles.txtAddress}>Hunt End Point</Text>

          <View style={styles.boxWrap}>
            <Text style={styles.txtStatus}>
              {postDetailsFromDB?.EndingAddress}
            </Text>
            <Image
              source={require("../../Assets/mapPin.png")}
              style={styles.ImgPin}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnNavigate}
          onPress={() => {
            navigateToStartPoint();
            onDone();
          }}
        >
          <Text style={styles.txtNavigate}> Navigate to Start Point</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderHeader = () => (
    <View style={{ ...styles.header, backgroundColor: "#fff" }}></View>
  );

  const PostId = route?.params?.PostId;
  const UserId = route?.params?.UserId;

  // const PostId = "testID";
  //////////////////////////////////
  //  Getting Previous Route Name
  //////////////////////////////////
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  // * alert(prevRoute.name)
  //////////////////////////////////
  //////////////////////////////////
  const [playRecordingModalVisible, setPlayRecordingModalVisible] =
    useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header
        label={"Where To Start & End Hunt?"}
        city={true}
        cityName={postDetailsFromDB?.City}
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />
      <PlayRecordingModal
        isVisible={playRecordingModalVisible}
        setIsVisibleCallback={setPlayRecordingModalVisible}
        recordingFilePath={postRecordingURL}
        setMarkerModelCallback={setmarkerModel}
      />
      <LoaderModal modalVisible={!isFetch} label="Fetchting Data" />

      {isFetch && (
        <View style={{ justifyContent: "center", marginTop: 50 }}>
          <MapView
            mapType={mapType}
            ref={mapRef}
            followsUserLocation={true}
            onRegionChangeComplete={(txt) => onChangeValue(txt)}
            onMapReady={() => onMapReady()}
            showsUserLocation={true}
            loadingEnabled={true}
            // showsMyLocationButton={false}
            zoomEnabled={true}
            pitchEnabled={true}
            showsCompass={true}
            showsBuildings={true}
            showsIndoors={true}
            rotateEnabled={true}
            toolbarEnabled={false}
            style={{ height: "100%" }}
            // initialCamera={{
            //   center: { ...postDetailsFromDB?.StartingPoint },
            //   pitch: 45,
            //   heading: 90,
            //   altitude: 1000,
            //   zoom: 10,
            // }}
            initialRegion={{
              ...postDetailsFromDB?.StartingPoint,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onPress={() => {
              // setmarkerModel(true);
            }}
          >
            <>
              <Marker coordinate={position}>
                <Image
                  source={imagePath.icCurLoc}
                  style={{ height: 25, width: 25 }}
                />
              </Marker>
              <Marker
                coordinate={postDetailsFromDB?.StartingPoint}
                style={{ zIndex: 120 }}
              >
                <Image
                  source={require("../../Assets/Start.png")}
                  style={{ height: 25, width: 25 }}
                />
                <Callout>
                  <View style={{ height: 100, width: 200 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "red",
                        alignSelf: "center",
                      }}
                    >
                      {c} Meter
                    </Text>
                    <Text>{Point}</Text>
                    <Text style={{ fontSize: 20 }}>
                      Starting Location of game
                    </Text>
                  </View>
                </Callout>
              </Marker>
              <Marker coordinate={destinationCordss} style={{ zIndex: 100 }}>
                <Image
                  source={require("../../Assets/End.png")}
                  style={{ height: 25, width: 25 }}
                />
                <Callout>
                  <View style={{ height: 100, width: 200 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "red",
                        alignSelf: "center",
                      }}
                    >
                      {c} Meter
                    </Text>
                    <Text>{Point}</Text>
                    <Text style={{ fontSize: 20 }}> Ending Destination </Text>
                  </View>
                </Callout>
              </Marker>
              {/* {markers?.map((i, ind) => (
                <MapView.Circle
                  center={i?.customMarkerCords}
                  radius={25}
                  strokeWidth={2}
                  strokeColor={Theme.primary}
                  fillColor="transparent"
                  key={ind}
                />
              ))} */}
              {/* <MapView.Circle
                center={postDetailsFromDB?.StartingPoint}
                radius={60}
                strokeWidth={2.5}
                strokeColor="red"
                fillColor="#B9B9B9"
                animation={true}
              /> */}
              {/* <MapView.Circle
                center={postDetailsFromDB?.EndingPoint}
                radius={60}
                strokeWidth={2.5}
                strokeColor="red"
                fillColor="#B9B9B9"
                animation={true}
              /> */}
            </>
            <MapViewDirections
              origin={postDetailsFromDB?.StartingPoint}
              destination={postDetailsFromDB?.EndingPoint}
              // optimizeWaypoints={true}
              mode="DRIVING"
              precision="high"
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={5}
              waypoints={postMarkerLocations}
              strokeColor={Theme.primary}
              onReady={(result) => {
                mapRef.current.fitToCoordinates(result.coordinate, {
                  edgepadding: {
                    right: Theme.wp("100%") / 20,
                    bottom: Theme.hp("100%") / 20,
                    left: Theme.wp("100%") / 20,
                    top: Theme.hp("100%") / 20,
                  },
                });
              }}
              onError={(errorMessage) => {}}
            />

            {/* {!isFirstLaunch && (
              <MapViewDirections
                origin={position}
                destination={postDetailsFromDB?.StartingPoint}
                // optimizeWaypoints={true}
                mode="DRIVING"
                precision="high"
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={5}
                // waypoints={postMarkerLocations}
                strokeColor={Theme.red}
                onReady={(result) => {
                  mapRef.current.fitToCoordinates(result.coordinate, {
                    edgepadding: {
                      right: Theme.wp("100%") / 20,
                      bottom: Theme.hp("100%") / 20,
                      left: Theme.wp("100%") / 20,
                      top: Theme.hp("100%") / 20,
                    },
                  });
                }}
                onError={(errorMessage) => {}}
              />
            )} */}
            {/* {markers?.map((i, ind) => (
              <MapViewDirections
                origin={position}
                destination={(pickupCordss, i?.customMarkerCords)}
                // optimizeWaypoints={true}
                mode="DRIVING"
                precision="high"
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={3}
                waypoints={postMarkerLocations}
                strokeColor={Theme.primary}
                key={ind}
                onReady={(result) => {
                  mapRef.current.fitToCoordinates(result.coordinate, {
                    edgepadding: {
                      right: 0,
                      bottom: 0,
                      left: 0,
                      top: 0,
                    },
                    animated: true,
                  });
                }}
                onError={(errorMessage) => {}}
              />
            ))} */}
            {markers.map((i, ind) => (
              <Marker
                coordinate={i?.customMarkerCords}
                key={ind}
                onPress={() => {
                  // markermodalcall(ind);
                  setmarkerModel(true);
                  postDetail(i, ind);
                }}
              >
                <Image
                  source={require("../../Assets/Point.png")}
                  style={{ height: 25, width: 25, resizeMode: "center" }}
                />
              </Marker>
            ))}
          </MapView>

          {isBtmSheetClose && (
            <TouchableOpacity
              onPress={() => {
                ref_MapType_RBSheet.current.open();
              }}
              style={styles.mapTypeIcon}
            >
              <MaterialCommunityIcons
                size={Theme.iconSize}
                color={Theme.primary}
                name="layers-outline"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              mapRef.current.animateToRegion({
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
            }}
            style={{
              backgroundColor: Theme.primary,
              width: Theme.wp("15%"),
              height: Theme.wp("15%"),
              borderRadius: 90,
              alignItems: Theme.align,
              justifyContent: Theme.align,
              position: "absolute",
              bottom: "10%",
              right: "5%",
            }}
          >
            <MaterialIcons
              size={Theme.iconSize}
              color={Theme.white}
              name="my-location"
            />
          </TouchableOpacity>
          <View style={{ position: "absolute", alignSelf: "center" }}>
            <Image
              style={{
                height: 30,
                width: 30,
                alignSelf: "center",
                tintColor: Theme.primary,
              }}
              source={require("../../Assets/marker1.png")}
            />
            {/* <Text style={styles.geoAddress}>{address}</Text> */}
          </View>
        </View>
      )}
      <BottomSheet
        ref={bs}
        snapPoints={[Theme.hp("58%"), 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        innerGestureHandlerRefs={true}
        onOpenEnd={() => {
          // setIsBtmSheetClose(true);
        }}
        onCloseEnd={() => {
          // setIsBtmSheetClose(false);
        }}
      />
      <RBSheet
        ref={ref_MapType_RBSheet}
        height={Theme.hp("25%")}
        closeOnDragDown={true}
        closeOnPressMask={false}
        // animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
          // draggableIcon: {
          //   backgroundColor: "#000",
          // },
          container: {
            ...Theme.shadow,
            paddingHorizontal: Theme.wp("4%"),
          },
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...styles.heading, top: 0 }}>Map Type</Text>
          <MaterialIcons
            size={Theme.iconSize}
            color={Theme.black}
            name="close"
            onPress={() => {
              // console.log(isBtmSheetClose);
              ref_MapType_RBSheet.current.close();
            }}
          />
        </View>
        <View style={styles.mapTypeContainer}>
          {MAP_TYPES.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  ...styles.mapType,
                  borderColor:
                    mapType == item.value ? Theme.primary : Theme.lightGray,
                }}
                key={item.key}
                value={item.value}
                onPress={() => {
                  setMapType(item.value);
                }}
              >
                <Image
                  source={item.icon}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  resizeMode="contain"
                />
                <Text
                  style={{ ...styles.txtStatus, marginTop: Theme.hp("1%") }}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </RBSheet>
      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setIsArrivedAtAnyPostModal(false);
        }}
        onBackdropPress={() => setIsArrivedAtAnyPostModal(false)}
        hasBackdrop={true}
        avoidKeyboard={false}
        isVisible={isArrivedAtAnyPostModal}
        animationIn="bounceIn"
        // animationInTiming={1000}
        // animationOut={"fadeOut"}
        // animationOutTiming={1000}
        coverScreen={false}
        backdropColor={"rgba(0,0,0,0.4)"}
      >
        <View style={styles.modalWrapper}>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={styles.heading}>
              Details Of Post
              {/* {indPost}  */}
            </Text>

            <ScrollView style={{}}>
              <View style={{ paddingTop: 10 }}>
                <View style={{ width: "100%", alignSelf: "center" }}>
                  <Text style={styles.headingName}>Name Of Post </Text>
                  <TextInput
                    placeholderTextColor="#E5E8E8"
                    // onChangeText={Text => setnamePost(Text)}
                    value={isArrivedAtAnyPostData?.PostName}
                    style={styles.markerTxin}
                    editable={false}
                  />
                  <Text style={styles.heading2}>
                    Description Of Post
                    {/* # Post {indPost} */}
                  </Text>
                  {/* <Text style={styles.heading2}>{indPost}</Text> */}
                  <View
                    style={{
                      width: "100%",
                      height: 130,
                      borderRadius: 13,
                      borderWidth: 1,
                      borderColor: "#e1e1e1",
                      marginBottom: 17,
                    }}
                  >
                    <TextInput
                      placeholder="Enter Post Description"
                      placeholderTextColor="#E5E8E8"
                      // onChangeText={Text => setdescPost(Text)}
                      value={isArrivedAtAnyPostData?.PostDesc}
                      style={styles.markerin}
                      editable={false}
                    />
                    <View style={styles.picVoiceContainer}>
                      <TouchableOpacity
                        style={styles.picVoiceWrap}
                        onPress={() => {
                          if (postImageURL !== "") {
                            setmarkerPhotoModal(true);
                          }
                        }}
                      >
                        <Text style={styles.txtAdd}>Picture</Text>
                        <AntDesign
                          size={16}
                          color={Theme.primary}
                          name="picture"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.picVoiceWrap}
                        onPress={() => {
                          if (postRecordingURL !== "") {
                            setIsArrivedAtAnyPostModal(false);
                            setPlayRecordingModalVisible(true);
                          }
                        }}
                      >
                        <Text style={styles.txtAdd}>Voice Description</Text>
                        <AntDesign
                          size={16}
                          color={Theme.primary}
                          name="sound"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.picVoiceWrap}>
                        <Text style={styles.txtAdd}>Other</Text>
                        <Entypo
                          size={16}
                          color={Theme.primary}
                          name="dots-three-horizontal"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <Text style={styles.option}>
                    Distance From Your Location :
                  </Text>
                  {/* <Text style={styles.value}> {lastInd} Meters</Text> */}

                  {/* <Text>{isWithinRange}</Text> */}
                </View>
                <View style={styles.row}>
                  <Text style={styles.option}>Address: </Text>
                  <Text style={styles.value}>
                    {isArrivedAtAnyPostData?.PostAddress}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  // onPress={() => navigation.navigate('AddQuiz')}
                  onPress={() => navigation.navigate("enterquiz")}
                  style={styles.cancelBtn}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                      color: Theme.primary,
                      fontWeight: "bold",
                    }}
                  >
                    Press To Do Quiz
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsArrivedAtAnyPostModal(false)}
                  style={styles.cancelBtn}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                      color: Theme.primary,
                      fontWeight: "bold",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsArrivedAtAnyPostModal(false);
                    //   setMarkers([...markers, {destinationCords: newRegion}]);
                    // setMarkersAddress([...markersAddress, {Location: address}]);
                    // addMarkers(newRegion, namePost, descPost, address);
                  }}
                  style={styles.addpostBtn}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                      color: Theme.white,
                      fontWeight: "bold",
                    }}
                  >
                    Finish
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {markers?.map((i, ind) => (
        <Modal
          animationType="fade"
          onBackButtonPress={() => {
            setmarkerModel(false);
          }}
          onBackdropPress={() => setmarkerModel(false)}
          hasBackdrop={true}
          avoidKeyboard={false}
          isVisible={markerModel}
          animationIn="bounceIn"
          // animationInTiming={1000}
          // animationOut={"fadeOut"}
          // animationOutTiming={1000}
          coverScreen={false}
          backdropColor={"rgba(0,0,0,0.4)"}
        >
          <View style={styles.modalWrapper}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={styles.heading}>
                Details Of Post
                {/* {indPost}  */}
              </Text>

              <ScrollView style={{}}>
                <View style={{ paddingTop: 10 }}>
                  <View style={{ width: "100%", alignSelf: "center" }}>
                    <Text style={styles.headingName}>Name Of Post </Text>
                    <TextInput
                      placeholderTextColor="#E5E8E8"
                      // onChangeText={Text => setnamePost(Text)}
                      value={namePost}
                      style={styles.markerTxin}
                      editable={false}
                    />
                    <Text style={styles.heading2}>
                      Description Of Post
                      {/* # Post {indPost} */}
                    </Text>
                    {/* <Text style={styles.heading2}>{indPost}</Text> */}
                    <View
                      style={{
                        width: "100%",
                        height: 130,
                        borderRadius: 13,
                        borderWidth: 1,
                        borderColor: "#e1e1e1",
                        marginBottom: 17,
                      }}
                    >
                      <TextInput
                        placeholder="Enter Post Description"
                        placeholderTextColor="#E5E8E8"
                        // onChangeText={Text => setdescPost(Text)}
                        value={descPost}
                        style={styles.markerin}
                        editable={false}
                      />
                      <View style={styles.picVoiceContainer}>
                        <TouchableOpacity
                          style={styles.picVoiceWrap}
                          onPress={() => {
                            if (postImageURL !== "") {
                              setmarkerPhotoModal(true);
                            }
                          }}
                        >
                          <Text style={styles.txtAdd}>Picture</Text>
                          <AntDesign
                            size={16}
                            color={Theme.primary}
                            name="picture"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.picVoiceWrap}
                          onPress={() => {
                            if (postRecordingURL !== "") {
                              setmarkerModel(false);
                              setPlayRecordingModalVisible(true);
                            }
                          }}
                        >
                          <Text style={styles.txtAdd}>Voice Description</Text>
                          <AntDesign
                            size={16}
                            color={Theme.primary}
                            name="sound"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picVoiceWrap}>
                          <Text style={styles.txtAdd}>Other</Text>
                          <Entypo
                            size={16}
                            color={Theme.primary}
                            name="dots-three-horizontal"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.option}>
                      Distance From Your Location :
                    </Text>
                    {/* <Text style={styles.value}> {lastInd} Meters</Text> */}

                    {/* <Text>{isWithinRange}</Text> */}
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.option}>Address: </Text>
                    <Text style={styles.value}>{i.PostAddress}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => navigation.navigate('AddQuiz')}
                    onPress={() => navigation.navigate("enterquiz")}
                    style={styles.cancelBtn}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 15,
                        color: Theme.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Press To Do Quiz
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setmarkerModel(!markerModel)}
                    style={styles.cancelBtn}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 15,
                        color: Theme.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setmarkerModel(!markerModel);
                      //   setMarkers([...markers, {destinationCords: newRegion}]);
                      // setMarkersAddress([...markersAddress, {Location: address}]);
                      // addMarkers(newRegion, namePost, descPost, address);
                    }}
                    style={styles.addpostBtn}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 15,
                        color: Theme.white,
                        fontWeight: "bold",
                      }}
                    >
                      Finish
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      ))}
      {/* ADD PICTURE/PHOTO MODAL */}
      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmarkerPhotoModal(!markerPhotoModal);
        }}
        onBackdropPress={() => setmarkerPhotoModal(!markerPhotoModal)}
        hasBackdrop={true}
        avoidKeyboard={false}
        isVisible={markerPhotoModal}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={styles.heading}>Photo of Post</Text>
            <ScrollView style={{ paddingTop: 10 }}>
              <View>
                <View style={styles.photoBorder}>
                  {postImageURL == "" ? (
                    <>
                      <Entypo name={"camera"} size={45} color={"gray"} />
                    </>
                  ) : (
                    <>
                      <Image
                        style={styles.imgEdit}
                        source={{
                          uri: postImageURL,
                        }}
                      />
                    </>
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setmarkerPhotoModal(!markerPhotoModal)}
                style={{
                  alignSelf: "center",
                  marginVertical: 10,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: Theme.red,
                  backgroundColor: Theme.white,
                  padding: 7,
                }}
              >
                <Text style={{ color: Theme.red }}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={pickupArrival}
        onBackButtonPress={() => {
          setpickupArrival(false);
        }}
        // onModalShow={setarrivedModel(false)}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <View
            style={{
              alignItems: "flex-start",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#2ECC71",
                }}
              >
                <Entypo size={15} color={Theme.white} name="check" />
              </View>
              <Text style={{ marginLeft: 10, fontSize: 20 }}>
                Yay! You at Starting point
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../../Assets/flag.png")}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: "center",
                }}
              />
              <Text
                style={{
                  color: "black",
                  marginLeft: 10,
                  fontSize: 20,
                  width: "80%",
                }}
              >
                {postDetailsFromDB?.StartingAddress}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                City
              </Text>
              <Text style={{ marginLeft: 10, color: "black", fontSize: 20 }}>
                {postDetailsFromDB?.City}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setpickupArrival(false);
                setIsFirstLaunch(true);
                // console.log("BackPressPickup = ", pickupArrival);
              }}
              style={styles.arrivedBtn}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 17,
                  color: Theme.white,
                  fontWeight: "bold",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserSideMap;
