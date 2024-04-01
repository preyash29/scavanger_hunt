import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import styles from "./Style";
import dgram from "react-native-udp";
import { Buffer } from "buffer";
import AudioRecord from "react-native-audio-record";
import moment from "moment";
// import AsyncStorage from "@react-native-async-storage/async-storage";
class RecordingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      audioFile: "",
      recording: false,
      loaded: false,
      paused: true,
      library: [],
      startRecord: false,
      stopRecord: false,
      recButton: true,
    };
  }
  async componentDidMount() {
    //Get Data
    // const AllValue = await AsyncStorage.getItem("PlayList");
    // if (AllValue != null) {
    //   this.setState({ library: JSON.parse(AllValue) });
    // }

    this.setState({ startRecord: true });
    await this.checkPermission();
    await this.checkConnectivity();
  }
  checkConnectivity = async () => {
    const socket = dgram.createSocket("udp4");
    const remotePort = 4001;
    const remoteHost = "192.168.38.107";
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
    this.setState({ status: true });
    socket.on("message", function (msg, rinfo) {
      console.log("Message received", msg);
    });
  };
  checkPermission = async () => {
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
  start = () => {
    this.setState({ recButton: false });
    const randomName = Math.random().toFixed(5);
    const _recordingName = randomName + moment().format("YYYYMMDDH") + ".wav";
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
    this.setState({ startRecord: false });
    this.setState({ stopRecord: true });

    console.log("start record");
    this.setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    this.setState({ recButton: true });
    if (!this.state.recording) return;
    console.log("stop record");
    let audioFile = await AudioRecord.stop();

    console.log("audioFile", audioFile);
    this.setState({ audioFile: audioFile, recording: false });
    this.setState({ library: [...this.state.library, this.state.audioFile] });
    // await AsyncStorage.setItem("PlayList", JSON.stringify(this.state.library));
    this.setState({ startRecord: true });
    this.setState({ stopRecord: false });
  };
  render() {
    const { recording, paused, audioFile, startRecord, stopRecord } =
      this.state;
    return (
      <View style={styles.MainView}>
        <Text style={styles.txtTitle}>Scavenger</Text>
        <View
          style={{
            position: "absolute",
            right: "5%",
            top: "3%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../Assets/avatar.png")}
            style={styles.logo}
          />
          {this.state.status === true ? (
            <Text style={styles.txtConn}>Connected</Text>
          ) : (
            <Text style={styles.txtConn}>Not Connected</Text>
          )}
        </View>
        <View style={styles.bottomView}>
          {startRecord === true ? (
            <TouchableOpacity
              style={styles.circle}
              disabled={recording}
              onPress={this.start}
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
              onPress={this.stop}
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

          {/* {this.state.recButton===true?()} */}
          <TouchableOpacity
            style={styles.wraptxtRecord}
            disabled={this.state.recButton === true ? false : true}
            onPress={() => this.props.navigation.navigate("Library")}
          >
            <Text style={styles.txtRecord}>RECORDINGS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RecordingScreen;
