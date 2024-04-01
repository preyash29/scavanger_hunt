/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { db, auth } from "../../../Utils/Exports";
import { firebase } from "@react-native-firebase/database";
// import firebase from 'react-native-firebase';
// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";

import storage from "@react-native-firebase/storage";

const App = () => {
  const [filePath, setFilePath] = useState({});
  const [img, SetImg] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [types, setType] = useState("");

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
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 400,
      cropping: true,
      // includeBase64: true,
    }).then((image) => {
      console.log(image);
      SetImg(image.path);
      // setType(image.mime);
      setType({ type: "image/jpg" });
      Setpick({ pick: true });
    });
  };
  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 1200,
  //     height: 780,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     SetImg(imageUri);
  //   });
  // };
  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log("Response = ", response);

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
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        console.log("type -> ", response.type);
        // console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const uploadImage = async () => {
    const uploadUri = img;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const storageRef = storage().ref(filename, auth.currentUser.uid);
    const task = storageRef.putFile(uploadUri);

    task.on("state_changed", (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == 100) {
      }
      //  console.log('image uploaded')
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      SetImg(null);
      console.log("======URL==========>", url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    const currentUid = auth.currentUser.uid;
    const ref = db.ref("Users/" + currentUid).child("/Custom-Coords");
    var markerKey = db
      .ref("Users/" + currentUid)
      .child("/Custom-Coords")
      .push().key;
    ref.once("value", (snapshot) => {
      if (snapshot.val()) {
        ref.child(markerKey).set({
          Image: imgUrl,
        });

        console.log("newArray", imagesarray);
      } else {
        // ref.child(markerKey).set({
        //   Image: imgUrl,
        // });
      }
    });

    // await ref.set({
    //   Image: imgUrl,
    // });
    console.log("Stored=========>", imgUrl);
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const currentUid = auth.currentUser.uid;
    let ref = db.ref("Tutors/" + currentUid).child("/user");

    // ref.on('value', snapshot => {
    //   const {Profile_Image} = snapshot.val();

    //   setProfileImage(Profile_Image);
    // });
  }, []);

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

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
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };
  // //checking
  // const addProfilePic = async () => {
  //   const blob1 = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError('Network request failed'));
  //     };
  //     xhr.responseType = 'blob';
  //     xhr.open('GET', img, true);
  //     xhr.send(null);
  //   });
  //   alert('uploadig');
  //   const uploadUri = img;
  //   let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  //   if (img !== '') {
  //     try {
  //       const metadata = {
  //         contentType: types,
  //       };
  //       await storage()
  //         .ref('ClientProfilePics/' + auth.currentUser.uid)
  //         .put(blob1, metadata)
  //         .then(async () => {
  //           console.log('its saved');
  //           // await storage
  //           //   .ref('ClientProfilePics/' + auth.currentUser.uid)
  //           //   .getDownloadURL()
  //           //   .then(async Url => {
  //           //     const myData = db
  //           //       .ref()
  //           //       .child('ClientUsers')
  //           //       .child(auth.currentUser.uid);
  //           //     await myData.update({
  //           //       profilePic: Url,
  //           //     });
  //           //     console.log('URL===>' + Url);
  //           //     this.setState({pick: false});
  //           //   });
  //         });
  //       //
  //       alert('Profile has been stored');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } else {
  //     alert('Kindly complete all fields');
  //   }
  // };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text>
      <View style={styles.container}>
        <Image
          style={styles.imgEdit}
          source={{
            uri: img,
            // this.props.myInfo.profilePic == null
            //   ? this.state.image
            //   : this.props.myInfo.profilePic,
          }}
        />
        {/* <Image source={{uri: filePath.uri}} style={styles.imageStyle} /> */}
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage("photo")}
        >
          <Text style={styles.textStyle}>Launch Camera for Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage("video")}
        >
          <Text style={styles.textStyle}>Launch Camera for Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => pickPicture()}
        >
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile("video")}
        >
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => {
            uploadImage();
            handleUpdate();
          }}
        >
          <Text style={styles.textStyle}>Upload</Text>
        </TouchableOpacity>
        {/* <Text onPress={uploadImage}>Upload</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  imgEdit: {
    height: 100,
    width: 130,
    borderRadius: 10,
    borderColor: "white",
    alignSelf: "center",
  },
});
