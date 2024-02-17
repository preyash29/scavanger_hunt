import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import dgram from "react-native-udp";
import { Buffer } from "buffer";
import AudioRecord from "react-native-audio-record";
import moment from "moment";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./Style";
import Theme from "../../Utils/Theme";

let PlayListt = [];
const RecordingModal = ({
  isVisible,
  setIsVisibleCallback,
  setRecFileCallback,
  setMarkerModelCallback,
}) => {
  const [recording, setRecording] = useState(false);
  const [startRecord, setStartRecord] = useState(false);
  const [stopRecord, setStopRecord] = useState(false);
  const [recBtn, setRecBtn] = useState(true);
  const [status, setStatus] = useState(false);
  const [audioFile, setAudioFile] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);
  const [library, setLibrary] = useState(null);

  useEffect(async () => {
    setStartRecord(true);
    await checkPermission();
    await checkConnectivity();
  }, []);

  const checkConnectivity = async () => {
    const socket = dgram.createSocket("udp4");
    const remotePort = 4001;
    const remoteHost = "192.168.0.100";
    socket.bind(44100);
    socket.once("listening", function () {
      socket.send(
        "Sended Successfully!",
        undefined,
        undefined,
        remotePort,
        remoteHost,
        function (err) {
          if (err) {
            throw err;
          } else {
            console.log("Connectivity Done!");
          }
        }
      );
    });
    setStatus(true);
    socket.on("message", function (msg, rinfo) {
      console.log("Message received", msg);
    });
  };
  const checkPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Permissions for record audio",
            message: "Give permission to your device to record audio",
            buttonPositive: "ok",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("permission granted");
        } else {
          console.log("permission denied");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };
  const start = async () => {
    setRecBtn(false);
    const _recordingName = "AUD-" + moment().format("DD.MM.YY.HHMMSS") + ".wav";
    // const randomName = Math.random().toFixed(5);
    // const _recordingName = randomName + moment().format("YYYYMMDDH") + ".wav";
    const options = {
      sampleRate: 44100,
      channels: 2,
      bitsPerSample: 16,
      wavFile: _recordingName,
    };

    AudioRecord.init(options);

    AudioRecord.on("data", (data) => {
      const chunk = Buffer.from(data, "base64");
    });
    setStartRecord(false);
    setStopRecord(true);
    setAudioFile("");
    setRecording(true);
    setLoaded(false);
    console.log("start record");
    AudioRecord.start();
  };

  const stop = async () => {
    setRecBtn(true);
    if (!recording) return;
    console.log("stop record");
    let audioFilee = await AudioRecord.stop();
    setAudioFile(audioFilee);
    setRecording(false);
    setLibrary({ audioFile: audioFile });
    //
    //
    PlayListt.push({ audioFile: audioFilee });
    // await AsyncStorage.setItem("@PlayList", JSON.stringify(PlayListt));
    //
    //
    setStartRecord(true);
    setStopRecord(false);
  };
  return (
    <Modal
      animationType="fade"
      // onBackButtonPress={() => {
      //   setIsVisibleCallback(false);
      // }}
      // onBackdropPress={() => setIsVisibleCallback(false)}
      hasBackdrop={true}
      avoidKeyboard={false}
      isVisible={isVisible}
      animationIn="slideInUp"
      coverScreen={false}
    >
      <View style={styles.modalWrapper}>
        <View
          style={{ width: "90%", alignSelf: "center", alignItems: "center" }}
        >
          {!startRecord && (
            <Image
              source={require("../../Assets/recording.gif")}
              style={styles.recGif}
            />
          )}
          <Text style={styles.heading}>Recording Modal</Text>
          <View style={styles.bottomView}>
            {startRecord === true ? (
              <TouchableOpacity
                style={styles.circle}
                disabled={recording}
                onPress={() => start()}
              >
                <View style={styles.circle1}>
                  <View style={styles.circle2}>
                    <View style={styles.circle3}></View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : stopRecord === true ? (
              <TouchableOpacity
                style={styles.circle}
                disabled={!recording}
                onPress={() => stop()}
              >
                <View style={styles.circle1}>
                  <View style={styles.circle2}>
                    <View
                      style={{
                        ...styles.circle3,
                        backgroundColor: "green",
                      }}
                    ></View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: Theme.hp("2%"),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsVisibleCallback(false);
              }}
            >
              <MCIcon
                name="close-circle"
                size={Theme.RFPercentage(6)}
                color={Theme.red}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // alert(audioFile);
                setMarkerModelCallback(true);
                setRecFileCallback(audioFile);
                setIsVisibleCallback(false);
                setTimeout(() => {
                  setAudioFile("");
                }, 500);
              }}
              disabled={audioFile === ""}
            >
              <MCIcon
                name="check-circle"
                size={Theme.RFPercentage(6)}
                color={audioFile === "" ? "#85FFC8" : "#00522D"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RecordingModal;
