import React, { Component } from "react";
import {
  View,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
} from "react-native";
import { Buffer } from "buffer";
import Permissions from "react-native-permissions";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";
import styles from "./Style";
import Header from "../../../../Components/Headers/AudioHeader/Audioheader";
import dgram from "react-native-udp";
import moment from "moment";
export default class Recording extends Component {
  sound = null;
  state = {
    audioFile: "",
    recording: false,
    loaded: false,
    paused: true,
    library: [],
  };

  async componentDidMount() {
    await this.checkPermission();
    await this.checkConnectivity();
    const randomName = Math.random().toFixed(5);
    // console.warn(randomName);
    const _recordingName = randomName + moment().format("YYYYMMDDH") + ".wav";
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: _recordingName,
    };

    AudioRecord.init(options);

    AudioRecord.on("data", (data) => {
      const chunk = Buffer.from(data, "base64");
      console.log("chunk size", chunk.byteLength);
      // do something with audio chunk
    });
  }

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
  checkConnectivity = async () => {
    const socket = dgram.createSocket("udp4");
    const remotePort = 4001;
    const remoteHost = "192.168.0.100";
    socket.bind(44100);
    socket.once("listening", function () {
      socket.send(
        "Hello World!",
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

    socket.on("message", function (msg, rinfo) {
      console.log("Message received", msg);
    });
  };

  requestPermission = async () => {
    const p = await Permissions.request("microphone");
    console.log("permission request", p);
  };

  start = () => {
    console.log("start record");
    this.setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log("stop record");
    let audioFile = await AudioRecord.stop();
    console.log("audioFile", audioFile);
    this.setState({ audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject("file path is empty");
      }

      this.sound = new Sound(this.state.audioFile, "", (error) => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory("Playback");

    this.sound.play((success) => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    console.log("library:", this.state.library);
    return (
      <View style={styles.MainView}>
        {/* Header Start*/}
        <Header
          labelIcon={true}
          label="Record"
          onBackPress={() => this.props.navigation.goBack()}
        />
        {/* Header End*/}
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
        <TouchableOpacity
          style={{ margin: "10%", backgroundColor: "red" }}
          onPress={() => this.props.navigation.navigate("Library")}
        >
          <Text>PlayList</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
