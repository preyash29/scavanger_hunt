import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  LogBox,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import { firebase } from "@react-native-firebase/database";
import Modal from "react-native-modal";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../Components/Headers/Headers";
import Theme from "../../Utils/Theme";
import styles from "./Style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import Geocode from "react-geocode";
import MapViewDirections from "react-native-maps-directions";
import CustomBtn from "../../Components/CustomBtn/CustomBtn";
import AddressPickup from "../../Components/AddressPickUp/AddressPickUp";
import { GOOGLE_MAP_KEY } from "../../Constants/GoogleMapKey";
import imagePath from "../../Constants/imagePath";
import RBSheet from "react-native-raw-bottom-sheet";
import * as geolib from "geolib";
import { db, auth } from "../../Utils/Exports";
import { getPreciseDistance } from "geolib";
import Destination from "../../Components/AddressPickUp/Destination";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import LoaderModal from "../../Components/Modals/LoaderModal";
import RecordingModal from "../../Components/Modals/RecordingModal";

const screen = Dimensions.get("window");
const Aspect_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * Aspect_RATIO;

Geocoder.init(GOOGLE_MAP_KEY);
Geocode.setApiKey(GOOGLE_MAP_KEY);

const HomePage = ({ route, navigation }) => {
  const currentUid = auth.currentUser?.uid;
  const huntDescription = route?.params?.huntDescription;
  const nameOfHunt = route?.params?.nameOfHunt;

  // const [huntID, setPostID] = useState("testID");
  const [huntID, setPostID] = useState(route?.params?.huntID);
  const [postMarkerLocations, setPostMarkerLocations] = useState([]);
  const [recordingModalVisible, setRecordingModalVisible] = useState(false);
  const [recFilePath, setRecFilePath] = useState("");
  const [firstModal, setfirstModal] = useState(false);
  const [morepost, setmorepost] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerModel, setmarkerModel] = useState(false);
  const [markerPhotoModal, setmarkerPhotoModal] = useState(false);
  const [maapModal, setmaapModal] = useState(false);
  const [pickupArrival, setpickupArrival] = useState("");
  const [destinantionArrival, setdestinantionArrival] = useState("");
  const [postDetailsModal, setPostDetailsModal] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [markerBtn, setmarkerBtn] = useState(false);
  const [endBtn, setendBtn] = useState(false);
  const [indexPost, setindexPost] = useState(1);
  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState("");
  const [inputcity, setinputCity] = useState("");
  const [inputcity1, setinputCity1] = useState("");
  const [address, setAddress] = useState("");
  const [newRegion, setNewRegion] = useState();
  const [remove, setremove] = useState(0);

  const [namePost, setnamePost] = useState("");
  const [descPost, setdescPost] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [loader, setloader] = useState(false);
  const [coordspoint, setcoordspoint] = useState({
    latitude: Number.parseFloat(0),
    longitude: Number.parseFloat(0),
  });
  const [destinatPoint, setdestinPoint] = useState({
    latitude: Number.parseFloat(0),
    longitude: Number.parseFloat(0),
  });

  //  States for Image Upload
  const [filePath, setFilePath] = useState("");
  const [img, SetImg] = useState("");
  // const [ProfileImage, setProfileImage] = useState("");
  const [types, setType] = useState("");
  {
    /*States for Image Upload*/
  }

  const [state1, Setstate1] = useState([]);
  const values = {
    latitude: Number.parseFloat(0),
    longitude: Number.parseFloat(0),
  };
  const [StartingAddress, setStartingAddress] = useState();
  const [EndingAddress, setEndingAddress] = useState();
  const [pickupCordss, SetpickCordss] = useState(values);
  const [destinationCordss, SetdestinationCordss] = useState(values);
  const [distance, setDistance] = useState("");
  const [markers, setMarkers] = useState([]);
  const [markersAddress, setMarkersAddress] = useState([
    {
      Location: "",
    },
  ]);

  const [post, setpost] = useState([]);
  const [allpost, setallpost] = useState([]);
  const [alllatitude, setalllatitude] = useState([]);
  const [customMarkerCords, SetcustomMarkerCords] = useState([]);
  const [button, setbutton] = useState(false);
  const [locationbutton, setlocationbutton] = useState(false);
  const [hiding, sethiding] = useState(false);

  const mapRef = useRef();

  const ref_AddRemEndPost_RBSheet = useRef();

  const checkValid = () => {
    if (Object.keys(destinationCordss).length === 0) {
      showError("Please enter your Destination location");
      return false;
    }
    if (Object.keys(pickupCordss).length === 0) {
      showError("Please enter your Pickup location");
      return false;
    }
    return true;
  };
  const onDone = async () => {
    if (checkValid()) {
      await addpost();
      setLineVisible(true);
      setVisible(true);
    }
  };

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
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };
  /////////////////////       Permissions-End        ///////////////////////

  const fetchAddressCords = (lat, lng, xyz) => {
    SetpickCordss({
      latitude: lat,
      longitude: lng,
    });

    // console.warn('City=>', xyz);
    setinputCity(xyz);
  };
  // console.warn('===>', pickupCordss);

  const fetchDestinationCords = (lat, lng, xyz1) => {
    SetdestinationCordss({
      latitude: lat,
      longitude: lng,
    });
    // console.warn('City1=====>', xyz1);
    setinputCity1(xyz1);
  };

  const postitem = () => {
    const ref = db.ref("Users/" + auth.currentUser.uid).child("/Posts");
    ref.on("value", (snapshot) => {
      const list = [];
      if (!snapshot.exists) {
        console.warn("no dataaa");
      } else {
        if (snapshot.val()) {
          snapshot.forEach((doc) => {
            const xyz = {
              StartingAddress: doc.val().StartingAddress,
              EndingAddress: doc.val().EndingAddress,
              City: doc.val().City,
            };
            list.push(xyz);
          });
          setpost(list);
        } else {
        }
      }
    });
  };

  useEffect(() => {
    handleLocationPermission();
    getUserLocation();
    liveLocation();
    postitem();

    isWithinRange;
    DistancetoDestionation;
    DistancetoPickup;
    lastInd;
    customRange;

    LogBox.ignoreLogs([
      "MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS",
      ' [TypeError: undefined is not an object (evaluating json.results[5].formatted_address")]',
    ]);
  }, []);

  const onMapReady = () => {
    getUserLocation();
    liveLocation();
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (error) => {
        console.log("Geolocation Error" + error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
        forceRequestLocation: true,
      }
    );
  };

  const liveLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (error) => {
        alert(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      liveLocation();
    }, 1000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    const intervall = setInterval(() => {
      closeModal();
      destionAr();
      PickupAr();
    }, 1000);

    return () => clearInterval(intervall);
  });

  const markerPhoto = () => {
    setmarkerPhotoModal(!markerPhotoModal);
  };

  const onChangeValue = (region) => {
    setNewRegion(region);
    Setstate1(region);
    setDistance(DistancetoDestionation);

    setTimeout(() => {
      Geocoder.from(state1?.latitude, state1?.longitude)
        .then((json) => {
          let formatted_address = json.results[1].formatted_address;
          let city_address = json.results[5].formatted_address.split(",")[0];

          setAddress(formatted_address);
          setCity(city_address);
        })
        .catch((error) => console.warn(error));
    }, 150);
  };
  setTimeout(() => {
    Geocoder.from(state1?.latitude, state1?.longitude)
      .then((json) => {
        let formatted_address = json.results[1].formatted_address;
        let city_address = json.results[5].formatted_address.split(",")[0];

        setAddress(formatted_address);
        setCity(city_address);
      })
      .catch((error) => console.warn(error));
  }, 150);
  let DistancetoPickup = getPreciseDistance(
    { latitude: lat, longitude: long },
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    }
  );
  let DistancetoDestionation = getPreciseDistance(
    { latitude: lat, longitude: long },
    {
      latitude: destinationCordss.latitude,
      longitude: destinationCordss.longitude,
    }
  );
  let isWithinRange = markers.map((i, ind) => {
    return getPreciseDistance(
      { latitude: lat, longitude: long },
      {
        latitude: i?.customMarkerCords.latitude,
        longitude: i?.customMarkerCords.longitude,
      }
    );
  });
  let lastInd = isWithinRange[isWithinRange.length - 1];

  let PointPickup = geolib.isPointWithinRadius(
    { latitude: lat, longitude: long },
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    },
    100
  );
  {
    // PointPickup === true ? console.warn("Arrived At Location Pickup") : "Yooo";
  }

  let Point = geolib.isPointWithinRadius(
    { latitude: lat, longitude: long },
    {
      latitude: destinationCordss.latitude,
      longitude: destinationCordss.longitude,
    },
    100
  );
  {
    // Point === true ? console.warn("Arrived At Location") : "Yooo";
  }

  let customRange = markers.map((i, ind) => {
    return geolib.isPointWithinRadius(
      { latitude: lat, longitude: long },
      {
        latitude: i?.customMarkerCords.latitude,
        longitude: i?.customMarkerCords.longitude,
      },
      100
    );
  });

  const custimL = customRange[customRange.length - 1];

  {
    // custimL === true ? console.warn("Arrived At Custom Location") : "Yooo";
  }

  const closeModal = () => {};

  const PickupAr = () => {
    setpickupArrival(PointPickup);
  };
  const destionAr = () => {
    setdestinantionArrival(Point);
  };

  const output = Object.assign({}, ...markersAddress);

  var string = JSON.stringify(output);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setVisible(false);
  };

  const imageFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image) => {
      SetImg(image.path);
      setFilePath(image.path);
    });
  };

  {
    /* Taking Photo from Camera*/
  }

  const imageFromCamera = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 550,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0].uri);
        SetImg(response.assets[0].uri);
      });
    }
  };
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };
  {
    /* Upload Image To Storage */
  }

  const [isUploading, setIsUploading] = useState(false);
  // const uploadImage = async () => {
  //   try {
  //     if (img !== "") {
  //       setIsUploading(true);
  //       const uploadUri = img;
  //       let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
  //       const storageRef = storage()
  //         .ref("allUser_PostImages")
  //         .child(currentUid)
  //         .child(huntID)
  //         .child(filename);
  //       const task = storageRef.putFile(uploadUri);

  //       task.on("state_changed", (snapshot) => {
  //         var progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         if (progress == 100) {
  //         }
  //       });

  //       try {
  //         await task;
  //         const url = await storageRef.getDownloadURL();
  //         return url;
  //       } catch (e) {
  //         alert(e);
  //         return null;
  //       }
  //     } else return "";
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  const uploadImage = async () => {
    try {
      if (!img) {
        return ""; // No image to upload
      }
  
      setIsUploading(true);
  
      const uploadUri = img;
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
  
      const storageRef = storage()
        .ref("allUser_PostImages")
        .child(currentUid)
        .child(huntID)
        .child(filename);
  
      const task = storageRef.putFile(uploadUri);
  
      // Listen to state changes of the upload task
      task.on("state_changed", (snapshot) => {
        // Calculate upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });
  
      // Wait for the upload task to complete
      await task;
  
      // Get download URL of the uploaded image
      const url = await storageRef.getDownloadURL();
      setIsUploading(false); // Reset isUploading state
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false); // Reset isUploading state in case of error
      throw error; // Rethrow the error to be handled by the caller
    }
  };
  
  const uploadRecording = async () => {
    try {
      if (recFilePath !== "") {
        setIsUploading(true);
        const uploadUri = recFilePath;
        let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const storageRef = storage()
          .ref("allUser_PostRecordings")
          .child(currentUid)
          .child(huntID)
          .child(filename);
        const task = storageRef.putFile(uploadUri);

        task.on("state_changed", (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
          }
        });

        try {
          await task;
          const url = await storageRef.getDownloadURL();
          return url;
        } catch (e) {
          alert(e);
          return null;
        }
      } else return "";
    } catch (error) {
      alert(error);
    }
  };
  const addMarkers = async (customMarkerCords, item2, item3, item4) => {
    try {
      const refCoords = db
        .ref("Users/" + currentUid)
        .child("/Coords")
        .child(huntID)
        .child("/Custom-Coords"); //1st Ref

      const refPost = db
        .ref("Users/" + currentUid)
        .child("/Posts")
        .child(huntID)
        .child("/Custom-Coords"); //2nd Ref

      let imgUrl = await uploadImage();
      let recURL = await uploadRecording();
      let markerKey = db
        .ref("Users/" + currentUid)
        .child("/Posts")
        .child(huntID)
        .child("/Custom-Coords")
        .push().key; //Unique Key

      refCoords.child(markerKey).update({
        customMarkerCords,
        PostName: item2,
        PostDesc: item3,
        PostAddress: item4,
        PostImage: imgUrl,
        PostRecording: recURL,
        uid: markerKey,
      });

      refPost
        .child(markerKey)
        .update({
          customMarkerCords,
          PostName: item2,
          PostDesc: item3,
          PostAddress: item4,
          PostImage: imgUrl,
          PostRecording: recURL,
          uid: markerKey,
        })
        .then(() => {
          setRecFilePath("");
          setFilePath("");
          SetImg("");
          setnamePost("");
          setdescPost("");
          setIsUploading(false);
        });
    } catch (error) {
      alert(error);
    }
  };
  const allpostdone = () => {
    setallpost(addMarkers(newRegion, namePost, descPost, address));
  };
  const addpost = async () => {
    try {
      const refernces = ["Posts", "Coords"];
      refernces.map(async (i) => {
        const reference = db
          .ref("Users/" + currentUid)
          .child(i)
          .child(huntID);
        await reference.update({
          City: city,
          NameOfHunt: nameOfHunt,
          Description: huntDescription,
          StartingAddress: inputcity,
          EndingAddress: inputcity1,
          StartingPoint: pickupCordss,
          EndingPoint: destinationCordss,
          PostId: huntID,
          UserId: currentUid,
        });
      });

      // await refPosts.update({
      //   City: city,
      //   NameOfHunt: nameOfHunt,
      //   Description: huntDescription,
      //   StartingAddress: inputcity,
      //   EndingAddress: inputcity1,
      //   StartingPoint: pickupCordss,
      //   EndingPoint: destinationCordss,
      //   PostId: huntID,
      // });
      // await refCoords.update({
      //   City: city,
      //   NameOfHunt: nameOfHunt,
      //   Description: huntDescription,
      //   StartingAddress: inputcity,
      //   EndingAddress: inputcity1,
      //   StartingPoint: pickupCordss,
      //   EndingPoint: destinationCordss,
      //   PostId: huntID,
      // });
    } catch (error) {
      alert(error);
    }
  };
  const markerbubble = (ind) => {
    Alert.alert(
      "Post Marker",
      "Do You Want To Delete Marker Post?, Press Cancel To Not Delete And Press Ok To Delete",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
        { text: "OK", onPress: () => onDeleteBTN(ind) },
      ],
      { cancelable: false }
    );
  };
  const showToast = () => {
    ToastAndroid.showWithGravity(
      "Please Click the Post",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const startpoint = (startlongitude, startlatitude) => {
    setloader(true);
    const cooords = {
      latitude: startlatitude,
      longitude: startlongitude,
    };
    SetpickCordss(cooords);
    setinputCity(address);
    ref_AddRemEndPost_RBSheet.current.close();
  };
  const endpoint = (endlongitude, endlatitude) => {
    ref_AddRemEndPost_RBSheet.current.close();
    const cooords = {
      latitude: endlatitude,
      longitude: endlongitude,
    };
    SetdestinationCordss(cooords);
    setinputCity1(address);
  };
  useEffect(() => {
    // getCity();
    // getcord();
    // fetchPostDetailViaPostID();
    // startpoint();
  });
  const getCity = async () => {
    const Stp = db.ref("Users/" + currentUid).child("/Coords");
    Stp.on("value", (snapshot) => {
      if (!snapshot.exists) {
        console.warn("no dataaa");
      } else {
        if (snapshot.val()) {
          const { StartingPoint } = snapshot.val();
          const { EndingPoint } = snapshot.val();
          var cords = EndingPoint;
          var cord = StartingPoint;
          setcoordspoint(cord);
          setdestinPoint(cords);
        } else {
        }
      }
    });
  };
  const getcord = async () => {
    var arraycords = []; // clear existing messages
    let keys = [];

    let ref = db
      .ref("Users/" + currentUid)
      .child("/Coords")
      .child(huntID)
      .child("/Custom-Coords");
    ref.orderByKey().on("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          customMarkerCords.push(item);
        });
      }
    });
    // .then((firstSnapShot) => {
    //   firstSnapShot.forEach((cordSnapshot) => {
    //     keys.push(cordSnapshot.key);
    //     arraycords.push(cordSnapshot.val()?.customMarkerCords);
    //     alllatitude.push({
    //       latitude: cordSnapshot.val()?.customMarkerCords.latitude,
    //       longitud: cordSnapshot.val()?.customMarkerCords.longitude,
    //     });
    //   });
    // });
  };

  const fetchPostDetailViaPostID = async () => {
    try {
      const ref = db
        .ref("Users/" + currentUid)
        .child("Posts")
        .child(huntID);
      ref.on("value", (snapshot) => {
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
        }

        customCoordinates.map((item, index) => {
          marker.push(item);
          customLatLong.push({
            latitude: item?.customMarkerCords?.latitude,
            longitude: item?.customMarkerCords?.longitude,
          });
        });
        // setMarkers(marker);
        setPostMarkerLocations(customLatLong);
      });
    } catch (error) {
      alert(error);
    }
  };
  const [markersFromDB, setMarkersFromDB] = useState([]);
  useEffect(() => {
    try {
      const ref = db
        .ref("Users/" + currentUid)
        .child("Posts")
        .child(huntID);
      ref.on("value", (snapshot) => {
        const customCoordinates = [];
        const marker = [];
        const customLatLong = [];
        if (snapshot.exists()) {
          const allPosts = snapshot.val();
          const { "Custom-Coords": Custom_Coords, ...remainigPostData } =
            allPosts;
          const x = Object.values(Custom_Coords);
          x.forEach((item, index) => {
            marker.push(item);
            customLatLong.push({
              latitude: item?.customMarkerCords?.latitude,
              longitude: item?.customMarkerCords?.longitude,
            });
          });
          setMarkers(marker);
          setPostMarkerLocations(customLatLong);
          setMarkersFromDB(marker);
        } else {
          setMarkers([]);
          setPostMarkerLocations([]);
          setMarkersFromDB([]);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, []);
  const allmarkers = () => {
    markers.push({
      ...markers,
      customMarkerCords: newRegion,
    });

    // setMarkers([...markers, { customMarkerCords: newRegion }]); //To be commented
    setMarkersAddress([...markersAddress, { Location: address }]);
    showToast();
    ref_AddRemEndPost_RBSheet.current.open();
    if (markers.length === 1) {
      startpoint(newRegion.longitude, newRegion.latitude);
      alert("You have set your Start Point");
    }
  };
  const [postToDeleteId, setPostToDeleteId] = useState(null);
  const markermodalcall = (post) => {
    console.log(post?.uid);
    setPostToDeleteId(post?.uid);
    ref_AddRemEndPost_RBSheet.current.open();
  };
  const [postDetails, setPostDetails] = useState(null);
  const postDetail = (i, ind) => {
    // alert(JSON.stringify(i, 0, 4));
    setPostDetails(i);
    setindexPost(ind + 1);
  };
  const onDeleteBTN = async (ind) => {
    console.log("delete Index", indexPost);
    markers.splice(indexPost, 1);
    // markersFromDB.splice(indexPost, 1);
    // setindexPost((prev) => prev - 1);
    try {
      await db
        .ref("Users")
        .child(currentUid)
        .child("Coords")
        .child(huntID)
        .child("Custom-Coords")
        .child(postToDeleteId)
        .remove();
      await db
        .ref("Users")
        .child(currentUid)
        .child("Posts")
        .child(huntID)
        .child("Custom-Coords")
        .child(postToDeleteId)
        .remove();
    } catch (error) {
      alert(error);
    }
  };
  const postIndex = (ind) => {
    setindexPost(ind);
  };

  return (
    <SafeAreaView style={styles.MainView}>
      <LoaderModal modalVisible={isUploading} label="Uploading" />
      <RecordingModal
        isVisible={recordingModalVisible}
        setIsVisibleCallback={setRecordingModalVisible}
        setRecFileCallback={setRecFilePath}
        setMarkerModelCallback={setmarkerModel}
      />
      <Header
        label={"Where To Start & End Hunt?"}
        headerFourComp={true}
        searchPress={() => {
          // alert(recFilePath);
          // return;
          if (locationbutton) {
            onDone().then(() => {
              navigation.navigate("UserSideMap", {
                PostId: huntID,
                UserId: currentUid,
              });
            });
            // return;
          } else {
            Alert.alert("Warning", "Please select Your Location");
          }
        }}
        navigation={navigation}
      />
      <View>
        <View style={{ justifyContent: "center" }}>
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
            rotateEnabled={true}
            style={{ height: "100%" }}
            onPress={() => {
              allmarkers();
              setbutton(true);
            }}
            initialRegion={{
              ...pickupCordss,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            {lineVisible === true ? (
              <>
                {pickupCordss === 0 ? null : (
                  <>
                    <Marker
                      coordinate={{
                        ...pickupCordss,
                      }}
                      style={{ zIndex: 100 }}
                      // image={imagePath.icCurLoc}
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
                            {DistancetoPickup} Meter
                          </Text>
                          <Text>{PointPickup}</Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: "black",
                              alignSelf: "center",
                            }}
                          >
                            {" "}
                            Start Point
                          </Text>
                        </View>
                      </Callout>
                    </Marker>
                  </>
                )}

                {destinationCordss === 0 ? null : (
                  <>
                    <Marker
                      coordinate={{
                        ...destinationCordss,
                      }}
                      style={{ zIndex: 100 }}

                      // image={imagePath.icGreenMaker}
                    >
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
                            {DistancetoDestionation} Meter
                          </Text>
                          <Text>{Point}</Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: "black",
                              alignSelf: "center",
                            }}
                          >
                            Destination Point
                          </Text>
                        </View>
                      </Callout>
                    </Marker>
                  </>
                )}

                {markers.map(
                  (i, ind) =>
                    i?.customMarkerCords && (
                      <MapView.Circle
                        center={i?.customMarkerCords}
                        radius={60}
                        strokeWidth={2.5}
                        strokeColor="red"
                        fillColor="#B9B9B9"
                        key={ind}
                      />
                    )
                )}

                {/* <MapView.Circle
                  center={destinationCordss}
                  radius={50}
                  strokeWidth={3.5}
                  strokeColor="red"
                  fillColor="#B9B9B9"
                  animation={true}
                /> */}
              </>
            ) : null}
            {pickupCordss !== values && destinationCordss !== values && (
              <MapViewDirections
                origin={pickupCordss}
                destination={destinationCordss}
                optimizeWaypoints={true}
                mode="DRIVING"
                precision="high"
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={5}
                strokeColor={Theme.red}
                waypoints={postMarkerLocations}
              />
            )}

            {markers.map(
              (i, ind) =>
                i.customMarkerCords && (
                  <>
                    <Marker
                      coordinate={i.customMarkerCords}
                      key={ind}
                      ref={(ref) => {
                        markers[markers.ind] = ref;
                      }}
                      onPress={() => {
                        if (button) {
                          markermodalcall(i);
                          setindexPost(ind);
                        }
                      }}
                      onCalloutPress={() => {
                        navigation.navigate("AddQuiz", {});
                      }}
                    >
                      <Image
                        source={require("../../Assets/Point.png")}
                        style={{ height: 25, width: 25 }}
                      />
                    </Marker>
                  </>
                )
            )}
            {markersFromDB.map(
              (i, ind) =>
                i.customMarkerCords && (
                  <>
                    <Marker
                      coordinate={i.customMarkerCords}
                      key={ind}
                      ref={(ref) => {
                        markers[markers.ind] = ref;
                      }}
                      onPress={() => {
                        if (button) {
                          postDetail(i, ind);
                          markermodalcall(i);
                          setindexPost(ind);
                        }
                      }}
                      onCalloutPress={() => {
                        navigation.navigate("AddQuiz", {});
                      }}
                      style={{ zIndex: 100 }}
                    >
                      <Image
                        source={require("../../Assets/Point.png")}
                        style={{ height: 25, width: 25 }}
                      />
                    </Marker>
                  </>
                )
            )}
          </MapView>

          <View style={styles.markerFixed}>
            <Image
              style={styles.marker}
              source={require("../../Assets/marker1.png")}
            />
            {/* <Text style={styles.geoAddress}>{address}</Text> */}
          </View>
        </View>
      </View>

      {/* CLICK to set the Start Point */}
      {button === true ? (
        <>
          <View></View>
        </>
      ) : (
        <View
          style={{
            position: "absolute",
            width: Theme.wp("90%"),
            height: Theme.hp("8%"),
            borderRadius: 10,
            backgroundColor: Theme.white,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: Theme.hp("12%"),
            flexDirection: "row",
            ...Theme.shadow,
          }}
        >
          <Text style={{ fontSize: 17, color: Theme.black }}> Click </Text>
          <Image
            source={require("../../Assets/marker1.png")}
            style={{ height: 20, width: 20 }}
          />
          <Text style={{ fontSize: 17, color: Theme.black }}>
            {" "}
            to set the Start Point{" "}
          </Text>
        </View>
      )}

      {markerBtn === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              allmarkers();
            }}
            style={styles.wrapPlusBtn2}
          >
            <Entypo size={Theme.iconSize} color={Theme.white} name="location" />
          </TouchableOpacity>
        </>
      ) : null}
      {endBtn === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              onDone();
            }}
            style={{
              backgroundColor: Theme.primary,
              width: Theme.wp("15%"),
              height: Theme.wp("15%"),
              borderRadius: 90,
              alignItems: Theme.align,
              justifyContent: Theme.align,
              position: "absolute",
              bottom: "5%",
              right: "5%",
            }}
          >
            {/* <Entypo size={Theme.iconSize} color={Theme.white} name="location" /> */}
            <Text style={{ fontSize: Theme.hp("2.5%"), color: Theme.white }}>
              End
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      {/* Location button map */}
      {hiding === true ? (
        <></>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              // alert("Current Location");
              // return;
              mapRef.current.animateToRegion({
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
              setlocationbutton(true);
              sethiding(true);
            }}
            style={{
              position: "absolute",
              bottom: "5%",
              right: "5%",
              width: Theme.wp("15%"),
            }}
          >
            <View style={{ left: "15%" }}>
              <Image
                source={require("../../Assets/dropdown.gif")}
                style={{ height: 50, width: 30 }}
              />
            </View>
            <View
              style={{
                backgroundColor: Theme.primary,
                width: Theme.wp("15%"),
                height: Theme.wp("15%"),
                borderRadius: 90,
                alignItems: Theme.align,
                justifyContent: Theme.align,
                // position: 'absolute',
                top: "0%",
                right: "5%",
              }}
            >
              <MaterialIcons
                name="my-location"
                color={Theme.white}
                size={Theme.iconSize}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {/* ANIMATE TO CURRENT LOCATION BUTTON */}
      {locationbutton === true ? (
        <TouchableOpacity
          onPress={() => {
            mapRef.current.animateToRegion({
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          style={styles.wrapPlusBtn}
        >
          <MaterialIcons
            name="my-location"
            color={Theme.white}
            size={Theme.iconSize}
          />
          {/* <Image source={require('../../Assets/pin.png')} style={{height:50, width:50}} /> */}
        </TouchableOpacity>
      ) : null}

      {/*  First MOdal start */}
      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setModalVisible(!modalVisible);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={modalVisible}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Enter Details</Text>
          <Text style={styles.bottomLine}></Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{ padding: 20 }}
          >
            <TextInput
              placeholder="Enter Hunt Description"
              placeholderTextColor="#37709a"
              onChangeText={(Text) => setDescription(Text)}
              value={description}
              style={styles.descTxt}
              multiline
            />
            <Text style={styles.headingText}>
              Enter Address where to start hunt
            </Text>
            <AddressPickup
              placheholderText="Where To Start Hunt?"
              fetchAddress={fetchAddressCords}
            />
            <View style={{}}>
              <Text style={styles.headingText}>
                Enter address where to End hunt
              </Text>
              <Destination
                placheholderText="Where To End Hunt?"
                fetchAddress1={fetchDestinationCords}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.cancelfirst}
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
                <CustomBtn
                  btnText="Save"
                  onPress={onDone}
                  btnStyle={{ marginTop: 20 }}
                />
              </View>
            </View>
            {visible === true ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  showDialog();
                  setmarkerBtn(true);
                  navigation.navigate("UserSideMap");
                }}
                style={styles.markerBtn}
              >
                <Text style={styles.markerBtnText}>Add Posts on Map +</Text>
              </TouchableOpacity>
            ) : null}
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      {/*  ADD POST MAIN MODAL  */}
      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmarkerModel(false);
        }}
        onBackdropPress={() => setmarkerModel(false)}
        hasBackdrop={true}
        avoidKeyboard={false}
        isVisible={markerModel}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.modalWrapper}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text style={styles.heading}>Details Of Post</Text>
              {/* <Text style={styles.heading}>Details Of # Post {indexPost} </Text> */}

              <ScrollView style={{}}>
                <View style={{ paddingTop: 10 }}>
                  <View style={{ width: "100%", alignSelf: "center" }}>
                    <TextInput
                      placeholder="Post Name"
                      placeholderTextColor="#E5E8E8"
                      onChangeText={(Text) => setnamePost(Text)}
                      value={namePost}
                      style={styles.markerTxin}
                      multiline
                    />
                    <Text style={styles.heading2}>Information about Post</Text>
                    <View
                      style={{
                        width: "100%",
                        height: 130,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#e1e1e1",
                        marginBottom: 17,
                      }}
                    >
                      <TextInput
                        placeholder="Post Description"
                        placeholderTextColor="#E5E8E8"
                        onChangeText={(Text) => setdescPost(Text)}
                        value={descPost}
                        style={styles.markerin}
                        multiline
                      />
                      <View style={styles.picVoiceContainer}>
                        <TouchableOpacity
                          // onPress={() =>
                          //   navigation.navigate('CreatorPhotoUpload')
                          // }>
                          style={styles.picVoiceWrap}
                          onPress={() => markerPhoto()}
                        >
                          <Text style={styles.txtAdd}>Add Picture</Text>
                          <AntDesign
                            size={16}
                            color={Theme.primary}
                            name="picture"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setmarkerModel(false);
                            setRecordingModalVisible(true);
                          }}
                          style={styles.picVoiceWrap}
                        >
                          <Text style={styles.txtAdd}>
                            Add Voice Description
                          </Text>
                          <AntDesign
                            size={16}
                            color={Theme.primary}
                            name="sound"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={{ width: "95%" }}>
                      <Text style={styles.option}>
                        Distance From Your Location :
                      </Text>
                      <Text style={styles.value}> {lastInd} Meters</Text>
                      <Text>{customRange}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={{ width: "95%" }}>
                      <Text style={styles.option}>Address: </Text>
                      <Text style={styles.value}>{address}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("AddQuiz", {
                        MarkerIndex: indexPost,
                      });
                    }}
                    style={styles.addquizBtn}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 15,
                        color: Theme.primary,
                        fontWeight: "bold",
                      }}
                    >
                      Add Quiz +
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      onDeleteBTN(indexPost);
                      setmarkerModel(false);
                    }}
                    style={styles.deleteMarkerBtn}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 15,
                        color: Theme.red,
                        fontWeight: "bold",
                      }}
                    >
                      Delete Marker -
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
                    <Text style={styles.cancelBtnTxt}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setmarkerModel(false);
                      allpostdone();
                      setindexPost((prev) => prev + 1);
                    }}
                    style={styles.addpostBtn}
                  >
                    <Text style={styles.addPostBtnTxt}>Add Post</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      {/*  Create Hunt MOdal  */}
      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setfirstModal(!firstModal);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={firstModal}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Create Hunt</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{ padding: 20 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // showDialog();
                  // setmarkerBtn(true);
                  navigation.replace("UserSideMap");
                }}
                style={styles.capturingBtn}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: "bold",
                  }}
                >
                  Start The Journey
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmorepost(!morepost);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={morepost}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Add More Post Or Not</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,
              // width: '100%',
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {/* <Text style={{color: Theme.white}}>Add more post or not</Text> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setmorepost(!morepost);
                    // navigation.replace('UserSideMap');
                  }}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 20,
                    marginTop: 10,
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: "#1596F3",
                    backgroundColor: Theme.white,
                    padding: 7,
                    marginBottom: 20,
                    elevation: 3,
                    width: "40%",
                    color: "#1596F3",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                      color: Theme.black,
                      fontWeight: "bold",
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // setModalVisible(!modalVisible);
                    setmorepost(!morepost);

                    // showDialog();
                    // setmarkerBtn(true);
                    // navigation.replace('UserSideMap');
                  }}
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 20,
                    marginTop: 10,
                    borderRadius: 7,
                    borderWidth: 1,
                    borderColor: "#1596F3",
                    backgroundColor: Theme.primary,
                    padding: 7,
                    marginBottom: 20,
                    elevation: 3,
                    width: "40%",
                    color: "#1596F3",
                    marginLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 15,
                      color: Theme.white,
                      fontWeight: "bold",
                    }}
                  >
                    Add More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      {/* map press model */}

      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmaapModal(!maapModal);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={firstModal}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Create Hunt</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{ padding: 20 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity onPress={() => {}} style={styles.capturingBtn}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: "bold",
                  }}
                >
                  Start Point
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: "bold",
                  }}
                >
                  Custom Point
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: "bold",
                  }}
                >
                  End Point
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      {/*  Arrived Marker At  Custom Destination  MOdal  */}
      {/* <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={Customlocation}
        onBackButtonPress={() => {
          setCustomlocation(!Customlocation);
        }}
        // onModalShow={setarrivedModel(false)}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: 'center',
                // width: 200,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: "white",
                  margin: 10,
                  alignItems: "center",
                  backgroundColor: "#2ECC71",
                }}
              >
                <Entypo
                  size={15}
                  color={Theme.white}
                  name="check"
                  style={{ padding: 10 }}
                />
              </View>

              <Text style={{ padding: 10, fontSize: 20 }}>
                Yay! You have arrived
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../Assets/flag.png")}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              />
              <View style={{ width: "80%", marginLeft: 10 }}>
                <Text style={{ color: "black", marginLeft: 5, fontSize: 20 }}>
                  {address}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: "black",
                  marginLeft: 5,
                  fontSize: 20,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              >
                {" "}
                City : {city}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setCustomlocation(!Customlocation);
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
                  close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* Destination Marker Modal */}
      {/* <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={destinantionArrival}
        onBackButtonPress={() => {
          setdestinantionArrival(!destinantionArrival);
        }}
        // onModalShow={setarrivedModel(false)}
        animationIn="slideInUp"
        coverScreen={false}
      >
        <View style={styles.modalWrapper}>
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: 'center',
                // width: 200,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: "white",
                  margin: 10,
                  alignItems: "center",
                  backgroundColor: "#2ECC71",
                }}
              >
                <Entypo
                  size={15}
                  color={Theme.white}
                  name="check"
                  style={{ padding: 10 }}
                />
              </View>

              <Text style={{ padding: 10, fontSize: 20 }}>
                Yay! You at destination point
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Image
                source={require("../../Assets/flag.png")}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              />
              <Text style={{ color: "black", marginLeft: 5, fontSize: 20 }}>
                {" "}
                {address}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "black",
                  marginLeft: 5,
                  fontSize: 20,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              >
                {" "}
                City : {city}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setdestinantionArrival(!destinantionArrival);
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
      </Modal> */}
      {markersFromDB?.map((i, ind) => (
        <Modal
          animationType="fade"
          onBackButtonPress={() => {
            setPostDetailsModal(false);
          }}
          onBackdropPress={() => setPostDetailsModal(false)}
          hasBackdrop={true}
          avoidKeyboard={false}
          isVisible={postDetailsModal}
          animationIn="slideInUp"
          coverScreen={false}
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
                      value={postDetails?.PostName}
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
                        value={postDetails?.PostDesc}
                        style={styles.markerin}
                        editable={false}
                      />
                      <View style={styles.picVoiceContainer}>
                        <TouchableOpacity
                          style={styles.picVoiceWrap}
                          onPress={() => {
                            // setmarkerPhotoModal(true);
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
                            // if (postRecordingURL !== "") {
                            //   setmarkerModel(false);
                            //   setPlayRecordingModalVisible(true);
                            // }
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

                    <Text>{customRange}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.option}>Address: </Text>
                    <Text style={styles.value}>{postDetails?.PostAddress}</Text>
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
                    onPress={() => setPostDetailsModal(false)}
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
                      setPostDetailsModal(false);
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
            <Text style={styles.heading}>Add Photo on Post</Text>
            <ScrollView style={{ paddingTop: 10 }}>
              <View>
                <View style={styles.photoBorder}>
                  {img == "" ? (
                    <>
                      <Entypo name={"camera"} size={45} color={"gray"} />
                    </>
                  ) : (
                    <>
                      <Image
                        style={styles.imgEdit}
                        source={{
                          uri: img,
                        }}
                      />
                    </>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.UploadBtn}
                  onPress={() => imageFromCamera("photo")}
                >
                  <Text style={styles.UploadBtnTxt}>
                    Take Photo From Camera
                  </Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    style={styles.UploadBtn}
                    onPress={() => imageFromGallery()}
                  >
                    <Text style={styles.UploadBtnTxt}>Choose From Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.Between2Btn}>
                <TouchableOpacity
                  onPress={() => setmarkerPhotoModal(!markerPhotoModal)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.cancelMarkerButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setmarkerPhotoModal(!markerPhotoModal);
                  }}
                  style={styles.addpostBtn}
                >
                  <Text style={styles.addPostMarkerButton}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ADD REMOVE END RBSHEET */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <RBSheet
          ref={ref_AddRemEndPost_RBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={Theme.hp("40%")}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              ...Theme.shadow,
            },
          }}
        >
          {/* <Text style={styles.heading}>Choose Point</Text> */}

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  elevation: 3,
                  backgroundColor: "white",
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "#1596F3",
                  padding: 15,
                }}
                onPress={() => {
                  setmarkerModel(true);
                  ref_AddRemEndPost_RBSheet.current.close();
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    color: "#1596F3",
                    fontWeight: "bold",
                  }}
                >
                  Add Post
                </Text>
                <AntDesign
                  name="pluscircleo"
                  size={Theme.iconSizee}
                  color={Theme.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  elevation: 3,
                  backgroundColor: "white",
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: Theme.red,
                  padding: 15,
                }}
                onPress={() => {
                  markerbubble(indexPost);
                  ref_AddRemEndPost_RBSheet.current.close();
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    color: Theme.red,
                    fontWeight: "bold",
                  }}
                >
                  Remove Post
                </Text>
                <AntDesign
                  name="minuscircleo"
                  color={Theme.red}
                  size={Theme.iconSizee}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  elevation: 3,
                  backgroundColor: "white",
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: Theme.green,
                  padding: 15,
                }}
                onPress={() => {
                  endpoint(newRegion.longitude, newRegion.latitude);
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    color: Theme.green,
                    fontWeight: "bold",
                  }}
                >
                  End Point
                </Text>

                <MaterialIcons
                  name="file-download-done"
                  color={Theme.green}
                  size={Theme.iconSizee}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  ref_AddRemEndPost_RBSheet.current.close();
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: "red",
                  height: 40,
                  width: "60%",
                  borderRadius: 10,
                  borderWidth: 2.5,
                  borderColor: Theme.white,
                  elevation: 5,
                }}
              >
                <Text
                  style={{
                    color: Theme.white,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};
export default HomePage;

//  Marker Start Point MOdal
{
  /* <Modal
  animationType="fade"
  transparent
  hasBackdrop={false}
  avoidKeyboard={false}
  isVisible={pickupArrival}
  onBackButtonPress={() => {
    setpickupArrival(!pickupArrival);
  }}
  // onModalShow={setarrivedModel(false)}
  animationIn="slideInUp"
  coverScreen={false}
>
  <View style={styles.modalWrapper}>
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: "white",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2ECC71",
          }}
        >
          <Entypo size={16} color={Theme.white} name="check" />
        </View>
        <Text style={{ fontSize: 20, color: Theme.black, marginLeft: 5 }}>
          Yay! You at Starting point
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: Theme.hp("1.5%"),
        }}
      >
        <Image
          source={require("../../Assets/flag.png")}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text
          style={{
            color: "black",
            marginLeft: 5,
            fontSize: 20,
            marginRight: Theme.wp("3%"),
          }}
        >
          {address}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: Theme.hp("1.5%"),
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
        <Text style={{ color: "black", fontSize: 20, marginLeft: 5 }}>
          {city}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setpickupArrival(!pickupArrival);
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
</Modal>; */
}
