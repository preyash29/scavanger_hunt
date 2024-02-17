import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./Style";
import Header from "../../../../Components/Headers/AudioHeader/Audioheader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from "react-native-sound";
import { db, auth, storage } from "../../../../Utils/Exports";
import RNFetchBlob from "react-native-fetch-blob";
import imagePath from "../../../../Constants/imagePath";
import uuid from "uuid";
class Library extends Component {
  sound = null;
  constructor(props) {
    super(props);
    this.state = {
      PlayList: "",
      audioFile: "",
      recording: null,
      // loaded: false,
      paused: true,
      selectedIndex: [],
      text: false,
    };
  }
  // selectItem = (index) => {
  //   if (this.state.selectedIndex.indexOf(index) > -1) {
  //     let newArray = this.state.selectedIndex.filter((indexObject) => {
  //       if (indexObject == index) {
  //         return false;
  //       }
  //       return true;
  //     });

  //     this.setState({ selectedIndex: newArray });
  //   } else {
  //     this.setState({ selectedIndex: [...this.state.selectedIndex, index] });
  //   }
  // };
  async componentDidMount() {
    const AllValue = await AsyncStorage.getItem("PlayList");
    alert(JSON.stringify(AllValue, 0, 4));
    // console.log('AllValue=>', AllValue);
    // this.setState({ PlayList: JSON.parse(AllValue) });
  }
  // load = () => {
  //   // console.log('load items===>', item);
  //   return new Promise((resolve, reject) => {
  //     if (!this.state.PlayList) {
  //       return reject("file path is empty");
  //     }

  //     this.sound = new Sound(this.state.PlayList, "", (error) => {
  //       if (error) {
  //         console.log("failed to load the file", error);
  //         return reject(error);
  //       }
  //       // this.setState({ loaded: true });
  //       this.setState({ paused: false });
  //       Sound.setCategory("Playback");

  //       this.sound.play((success) => {
  //         if (success) {
  //           console.log("successfully finished playing");
  //         } else {
  //           console.log("playback failed due to audio decoding errors");
  //         }
  //         this.setState({ paused: true });
  //       });
  //       return resolve();
  //     });
  //   });
  // };

  // pause = (item) => {
  //   console.log("Item pause", item);
  //   this.sound.pause();
  //   this.setState({ paused: true });
  // };

  // _addAudio = async () => {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e, "yee");
  //       reject(new TypeError("Network request failed"));
  //     };

  //     xhr.responseType = "blob";
  //     xhr.open("GET", this.state.PlayList, true);
  //     // xhr.open('GET', uri, true);
  //     xhr.send(null);
  //   });
  //   alert("uploadig");
  //   const uploadUri = this.state.PlayList;
  //   // let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // const snapshot = await ref.putString(file, 'base64');
  //   if (this.state.PlayList !== "") {
  //     try {
  //       const metadata = {
  //         contentType: "audio / wav",
  //       };
  //       await storage.ref("CreateSide-PostAudio/" + auth.currentUser.uid);
  //       child(auth.currentUser.uid)
  //         .put(blob)
  //         .then(async () => {
  //           await storage
  //             .ref("CreateSide-PostAudio" + auth.currentUser.uid)
  //             .getDownloadURL()
  //             .then(async (Url) => {
  //               const myData = db
  //                 .ref()
  //                 .child("Audio")
  //                 .child(auth.currentUser.uid);
  //               await myData.update({
  //                 audio: Url,
  //               });
  //               console.log("URL===>" + Url);
  //             });
  //         });
  //       //
  //       alert("Profile has been stored");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } else {
  //     alert("Kindly complete all fields");
  //   }
  //   // const uploadGetUrl = async (this.state.PlayList ) => {
  //   //   let paths = '';
  //   //   try {
  //   //     var ref = storage.ref('CreateSide-PostAudio/' + auth.currentUser.uid);
  //   //        const metadata = {
  //   //          contentType: 'audio / wav',
  //   //        };
  //   //     ref
  //   //       .put(this.state.PlayList,metadata)
  //   //       .then(async () => {
  //   //          await storage
  //   //            .ref('CreateSide-PostAudio' + auth.currentUser.uid)
  //   //            .getDownloadURL()
  //   //            .then(async Url => {
  //   //              const myData = db
  //   //                .ref()
  //   //                .child('Audio')
  //   //                .child(auth.currentUser.uid);
  //   //              await myData.update({
  //   //                audio: Url,
  //   //              });
  //   //              console.log('URL===>' + Url);
  //   //            });
  //   //       });

  //   //   } catch (error) {
  //   //     console.log('error in firebase image upload=>', error);
  //   //     return;
  //   //   }
  //   // };
  // };
  render() {
    return (
      <View style={styles.MainView}>
        <Header
          labelIcon={true}
          label="Library"
          onBackPress={() => this.props.navigation.goBack()}
        />
        {/* {this.state.PlayList !== "" ? (
          <>
            <View style={styles.wrapContent}>
              <View style={{ ...styles.flexJustify, borderBottomWidth: 0.2 }}>
                <View style={{ width: "70%" }}>
                  <Text style={styles.txtName}>{this.state.PlayList}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.load();
                    this._addAudio();
                  }}
                >
                  <Image
                    source={require("../../../../Assets/playButton.png")}
                    style={styles.imgPauseBtn}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.txtNoData}>Empty Library</Text>
        )} */}
      </View>
    );
  }
}

export default Library;
