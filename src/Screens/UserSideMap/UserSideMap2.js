import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as geolib from "geolib";
import { getPreciseDistance } from "geolib";
import BottomSheet from "reanimated-bottom-sheet";
import Animated, { set } from "react-native-reanimated";
import { GOOGLE_MAP_KEY } from "../../Constants/GoogleMapKey";
import imagePath from "../../Constants/imagePath";
import Theme from "../../Utils/Theme";
import { AirbnbRating } from "react-native-ratings";
import Header from "../../Components/Headers/Headers";
import { db, auth } from "../../Utils/Exports";
import Modal from "react-native-modal";
import styles from "./Style";

const screen = Dimensions.get("window");
const Aspect_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * Aspect_RATIO;

const UserSideMap2 = ({ navigation, route }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [postImageURL, setPostImageURL] = useState("");
  const [postRecordingURL, setPostRecordingURL] = useState("");
  const [isFetch, setIsFetch] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalQuiz, setModalQuiz] = useState(false);
  const [StartingAddress, setStartingAddress] = useState([]);
  const [EndingAddress, setEndingAddress] = useState([]);
  const [lineVisible, setLineVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [city, setcity] = useState([]);
  const [pickupArrival, setpickupArrival] = useState("");
  const [description, setDescription] = useState("");
  const [state1, Setstate1] = useState({
    region: {
      latitude: Number(0),
      longitude: Number(0),
    },
  });
  const [newRegion, setNewRegion] = useState(null);

  const [copy, setcpoy] = useState(false);

  const [pickupCordss, SetpickCordss] = useState({
    latitude: Number(0),
    longitude: Number(0),
  });
  const [customMarkerCords, SetcustomMarkerCords] = useState([]);
  const [destinationCordss, SetdestinationCordss] = useState({
    // latitude: 31.4804642,
    // longitude: 74.3239342,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [distance, setDistance] = useState("");
  const [range, setRange] = useState("");
  const [lat, setLat] = useState(0);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [long, setLong] = useState(0);
  const [markerModel, setmarkerModel] = useState(false);
  const [markerPhotoModal, setmarkerPhotoModal] = useState(false);

  const [remove, setremove] = useState(0);
  const [markerDistance, setmarkerDistance] = useState(null);
  const [namePost, setnamePost] = useState("");
  const [descPost, setdescPost] = useState("");
  const [indPost, setindPost] = useState(1);
  // const [namePost, setnamePost] = useState('');
  const [markers, setMarkers] = useState([]);

  const mapRef = useRef();
  const bs = React.createRef();

  // const bottomsheet2 = React.createRef();
  // const fall1 = new Animated.Value(1);

  const fall = new Animated.Value(1);
  //////////////////////      Permissions      /////////////////////////////
  const handleLocationPermission = async () => {
    let permissionCheck = "";
    if (Platform.OS === "ios") {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn("Location permission granted.")
          : console.warn("Location perrmission denied.");
      }
    }

    if (Platform.OS === "android") {
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
  };
  /////////////////////       Permissions-End        ///////////////////////

  const PickupAr = () => {
    setpickupArrival(Point);
    // console.log('PickupArrival===', pickupArrival);
  };

  let Point = geolib.isPointWithinRadius(
    { latitude: position.latitude, longitude: position.longitude },
    {
      latitude: pickupCordss?.latitude,
      longitude: pickupCordss?.longitude,
    },
    50
  );
  {
    Point === true ? console.warn("Arrived At Location") : "Yooo";
  }
  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      async (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },

      async (error) => {
        console.log("Geolocation Error" + error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 100 }
    );
    // console.log('position.coords', position.coords.latitude);
  };

  const liveLocation = async () => {
    watchId = Geolocation.watchPosition(
      async (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },

      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 100, maximumAge: 100 }
    );
  };

  useEffect(() => {
    if (!isFirstLaunch) {
      const intervall = setInterval(() => {
        PickupAr();
      }, 1000);

      return () => clearInterval(intervall);
    }
  });

  useEffect(() => {
    handleLocationPermission();
    getUserLocation();
    liveLocation();
    isWithinRange;
    c;
    // lastInd;
    customRange;
    custimL;

    bs.current.snapTo(0);
  }, []);
  useEffect(async () => {
    await getCity();
    await getcord();
    fetchPostDetailViaPostID();
  }, []);

  const onMapReady = () => {
    mapRef.current.animateToRegion({
      ...postDetailsFromDB?.StartingPoint,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    getUserLocation();
    liveLocation();
  };

  const getCity = async () => {
    const currentUid = auth.currentUser.uid;
    const ref1 = db.ref("Users/" + currentUid).child("/Coords");
    const ref = db.ref("Users/" + currentUid).child("/Coords");
    const Stp = db.ref("Users/" + currentUid).child("/Coords");

    const list = [];
    const list1 = [];
    const cityy = [];
    const desc = [];
    const stp = [];
    ref.on("value", (snapshot) => {
      if (!snapshot.exists) {
        console.warn("no dataaa");
      } else {
        if (snapshot.val()) {
          const { StartingAddress, EndingAddress } = snapshot.val();
          const item1 = Object.values({ StartingAddress });
          const item2 = Object.values({ EndingAddress });
          list.push(item1);
          list1.push(item2);
          setStartingAddress(list);
          setEndingAddress(list1);
        } else {
        }
      }
    });
    ref1.on("value", (snapshot) => {
      if (!snapshot.exists) {
        console.warn("no dataaa");
      } else {
        if (snapshot.val()) {
          const { City } = snapshot.val();
          const { Description } = snapshot.val();
          const items = Object.values({ City });
          setDescription(Description);
          cityy.push(items);
          setcity(cityy);
        } else {
        }
      }
    });
    Stp.on("value", (snapshot) => {
      if (!snapshot.exists) {
        console.warn("no dataaa");
      } else {
        if (snapshot.val()) {
          const { StartingPoint } = snapshot.val();
          const { EndingPoint } = snapshot.val();
          var cords = EndingPoint;
          var cord = StartingPoint;
          SetpickCordss(cord);
          SetdestinationCordss(cords);
          setcpoy(true);
        } else {
        }
      }
    });
  };

  const getcord = async () => {
    const currentUid = auth.currentUser.uid;
    let ref = db
      .ref("Users/" + currentUid)
      .child("/Coords")
      .child(PostId)
      .child("/Custom-Coords");
    ref.orderByKey().once("value", (snapshot) => {
      snapshot.forEach((item) => {
        // alert(JSON.stringify(item))
      });
      // snapshot.val()?.map((item, index) => {
      //   customMarkerCords.push(item);
      // });
    });
  };
  const [postMarkerLocations, setPostMarkerLocations] = useState([]);
  const [postDetailsFromDB, setPostDetailsFromDB] = useState([]);
  const fetchPostDetailViaPostID = async () => {
    const currentUid = auth.currentUser.uid;
    const ref = db
      .ref("Users/" + currentUid)
      .child("Posts")
      .child(PostId);
    ref.once("value", (snapshot) => {
      const allPostsData = [];
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
    Setstate1({
      region,
    });
    setDistance({
      // distance: dis / 1000,
      c,
      //   isWithinRange,
    });
    setRange({
      isWithinRange,
    });
  };
  const c = getPreciseDistance(
    { latitude: position.latitude, longitude: position.longitude },
    {
      latitude: pickupCordss?.latitude,
      longitude: pickupCordss?.longitude,
    }
  );

  const isWithinRange = customMarkerCords?.map((i, ind) => {
    return getPreciseDistance(
      { latitude: position.latitude, longitude: position.longitude },
      {
        latitude: i?.customMarkerCords.latitude,
        longitude: i?.customMarkerCords.longitude,
      }
    );
  });

  const lastInd = isWithinRange;

  let customRange = customMarkerCords?.map((i, ind) => {
    return geolib.isPointWithinRadius(
      { latitude: position.latitude, longitude: position.longitude },
      {
        latitude: i?.customMarkerCords.latitude,
        longitude: i?.customMarkerCords.longitude,
      },
      50
    );
  });

  let custimL = customRange[customRange.length - 1];

  const markermodalcall = (ind) => {
    setmarkerModel(true);
    setremove(ind);
  };
  const postDetail = (i, ind) => {
    // alert(JSON.stringify(i, 0, 4));
    setnamePost(i?.PostName);
    setdescPost(i?.PostDesc);
    setPostImageURL(i?.PostImage);
    setindPost(ind + 1);
    console.log("indexccccccccc", ind);
  };
  const navigateToStartPoint = () => {
    mapRef.current.animateToRegion({
      latitude: Startcordvalue.latitude,
      longitude: Startcordvalue.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    bs.current.snapTo(1);
    // getcord();
  };
  const checkValid = () => {
    if (Object.keys(destinationCordss).length === 0) {
      showError("Please enter your destination location");
      return false;
    }
    if (Object.keys(pickupCordss).length === 0) {
      showError("Please enter your destination location");
      return false;
    }
    return true;
  };
  const onDone = async () => {
    //
    const isValid = checkValid();
    if (isValid) {
      Startcordvalue;
      Endcoordsvalue;
      setLineVisible(true);
      console.log("line------->", pickupCordss);
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
          <Text style={styles.txtTitle}>{cityy}</Text>
          <View>
            <Text style={styles.txtCreatedBy}>
              created by{" "}
              <Text style={{ ...styles.txtCreatedBy, color: "#1596F3" }}>
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
          {Description}
        </Text>
        {/* <Text style={styles.txtPosts}>3 POSTS</Text> */}
        <View>
          <Text style={styles.txtAddress}>Hunt Start Point</Text>

          <View style={styles.boxWrap}>
            <Text style={styles.txtStatus}>{StartAddress}</Text>
            <Image
              source={require("../../Assets/mapPin.png")}
              style={styles.ImgPin}
            />
          </View>
        </View>
        <View>
          <Text style={styles.txtAddress}>Hunt End Point</Text>

          <View style={styles.boxWrap}>
            <Text style={styles.txtStatus}>{EndAddress}</Text>
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
          <Text style={styles.txtNavigate}>Navigate to Start Point</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderHeader = () => (
    <View style={{ ...styles.header, backgroundColor: "#fff" }}></View>
  );

  const INITIAL_REGION_COORDS = {
    latitude: 31.509205308720738,
    longitude: 74.28023664280772,
  };

  const StartAddress = route.params?.StartAddress;
  const EndAddress = route.params?.EndAddress;
  const cityy = route.params?.cityy;

  const Startcordvalue =
    route.params?.Startcordvalue != null
      ? route.params?.Startcordvalue
      : INITIAL_REGION_COORDS;

  const Endcoordsvalue =
    route.params?.Endcoordsvalue != null
      ? route.params?.Endcoordsvalue
      : INITIAL_REGION_COORDS;
  const { CoordValue } = route.params;
  const Description = route.params?.description;

  const PostId = route?.params?.PostId;
  return (
    <View style={{ flex: 1 }}>
      <Header
        label={"Where To Start & End Hunt?"}
        city={true}
        cityName={cityy}
        navigation={navigation}
      />
      <View style={{ justifyContent: "center", marginTop: Theme.hp("6%") }}>
        {isFetch && (
          <MapView
            ref={mapRef}
            followsUserLocation={true}
            onRegionChangeComplete={(txt) => onChangeValue(txt)}
            onMapReady={() => onMapReady()}
            showsUserLocation={true}
            loadingEnabled={true}
            showsMyLocationButton={false}
            zoomEnabled={true}
            pitchEnabled={true}
            showsCompass={true}
            showsBuildings={true}
            showsIndoors={true}
            rotateEnabled={true}
            style={{ height: "100%" }}
            initialRegion={{
              ...postDetailsFromDB?.StartingPoint,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onPress={() => {
              console.log(JSON.stringify(postDetailsFromDB, 0, 4));
            }}
          >
            <>
              <Marker coordinate={postDetailsFromDB?.StartingPoint}>
                <Image
                  source={imagePath.icCurLoc}
                  style={{ height: 30, width: 30 }}
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
              {/* <Marker coordinate={Endcoordsvalue} animation={true}>
              <Image
                source={imagePath.icGreenMaker}
                style={{ height: 30, width: 30 }}
              />
              <Callout>
                <View style={{ height: 100, width: 200 }}>
                  <Text
                    style={{ fontSize: 20, color: "red", alignSelf: "center" }}
                  >
                    {c} Meter
                  </Text>
                  <Text>{Point}</Text>
                  <Text style={{ fontSize: 20 }}> Ending Destination </Text>
                </View>
              </Callout>
            </Marker> */}
              {markers?.map((i, ind) => (
                <MapView.Circle
                  center={i?.customMarkerCords}
                  radius={60}
                  strokeWidth={2.5}
                  strokeColor="red"
                  fillColor="#B9B9B9"
                  key={ind}
                />
              ))}
              <MapView.Circle
                center={Startcordvalue}
                radius={60}
                strokeWidth={2.5}
                strokeColor="red"
                fillColor="#B9B9B9"
                animation={true}
              />
              <MapView.Circle
                center={Endcoordsvalue}
                radius={60}
                strokeWidth={2.5}
                strokeColor="red"
                fillColor="#B9B9B9"
                animation={true}
              />
            </>
            <MapViewDirections
              origin={Startcordvalue}
              destination={Endcoordsvalue}
              // optimizeWaypoints={true}
              mode="DRIVING"
              precision="high"
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={3}
              waypoints={postMarkerLocations}
              strokeColor={Theme.primary}
              onReady={(result) => {
                mapRef.current.fitToCoordinates(result.coordinate, {
                  edgepadding: {
                    right: 30,
                    bottom: 300,
                    left: 30,
                    top: 100,
                  },
                  animated: true,
                });
              }}
              onError={(errorMessage) => {}}
            />

            {markers?.map((i, ind) => (
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
            ))}
            {markers.map((i, ind) => (
              // {alert(JSON.stringify(i?.customMarkerCords,0,4))}
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
                  source={require("../../Assets/flag.png")}
                  style={{ height: 25, width: 25, resizeMode: "center" }}
                />
              </Marker>
            ))}
          </MapView>
        )}

        <TouchableOpacity
          onPress={() => {
            mapRef.current.animateToRegion({
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
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
            bottom: Theme.hp("2.5%"),
            right: Theme.wp("5%"),
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
            style={{ height: 40, width: 40, alignSelf: "center" }}
            source={require("../../Assets/marker1.png")}
          />
          {/* <Text style={styles.geoAddress}>{address}</Text> */}
        </View>
      </View>
      <BottomSheet
        ref={bs}
        snapPoints={[Theme.hp("58%"), 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        innerGestureHandlerRefs={true}
      />
      {customMarkerCords?.map((i, ind) => (
        <Modal
          animationType="fade"
          onBackButtonPress={() => {
            setmarkerModel(false);
          }}
          onBackdropPress={() => setmarkerModel(false)}
          hasBackdrop={false}
          avoidKeyboard={false}
          isVisible={markerModel}
          animationIn="slideInUp"
          coverScreen={false}
        >
          <View style={styles.modalWrapper}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={styles.heading}>Details Of # Post {indPost} </Text>

              <ScrollView style={{}}>
                <View style={{ paddingTop: 10 }}>
                  <View style={{ width: "100%", alignSelf: "center" }}>
                    <Text style={styles.headingName}>Name Of Post </Text>
                    <TextInput
                      placeholderTextColor="#E5E8E8"
                      // onChangeText={Text => setnamePost(Text)}
                      value={namePost}
                      style={styles.markerTxin}
                      editable={true}
                      multiline
                    />
                    <Text style={styles.heading2}>
                      Description Of Post # Post {indPost}
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
                        multiline
                      />
                      <View style={styles.picVoiceContainer}>
                        <TouchableOpacity
                          style={styles.picVoiceWrap}
                          onPress={() => {
                            setmarkerPhotoModal(true);
                          }}
                        >
                          <Text style={styles.txtAdd}>Picture</Text>
                          <AntDesign
                            size={16}
                            color={Theme.primary}
                            name="picture"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picVoiceWrap}>
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

                    <Text>{customRange}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.option}>Address: </Text>
                    <Text style={styles.value}>{i?.PostAddress}</Text>
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
                    onPress={() => setmarkerModel(false)}
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
                      setmarkerModel(false);
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
              {StartingAddress}
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
              {city}
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
              Finish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserSideMap2;
