import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./Style";
import Theme from "../../Utils/Theme";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Sound from "react-native-sound";

let sound = null;

const PlayRecordingModal = ({
  isVisible,
  setIsVisibleCallback,
  recordingFilePath,
  setMarkerModelCallback,
}) => {
  const [play, setPlay] = useState(true);

  const load = () => {
    setPlay(false);
    return new Promise((resolve, reject) => {
      if (recordingFilePath === "") {
        return reject("file path is empty");
      }

      sound = new Sound(recordingFilePath, "", (error) => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }

        Sound.setCategory("Playback");

        sound.play((success) => {
          if (success) {
            console.log("successfully finished playing");
            setPlay(true);
          } else {
            console.log("playback failed due to audio decoding errors");
          }
        });

        return resolve();
      });
    });
  };
  const pauseRecording = () => {
    sound.pause();
    setPlay(true);
  };
  return (
    <Modal
      animationType="fade"
      onBackButtonPress={() => {
        !play && pauseRecording();
        setIsVisibleCallback(false);
        setMarkerModelCallback(true);
      }}
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
          {!play && (
            <Image
              source={require("../../Assets/play.gif")}
              style={styles.recGif}
            />
          )}
          <Text style={styles.heading}>Play Recording</Text>

          <View style={styles.playPauseBtnsView}>
            <TouchableOpacity
              onPress={() => {
                pauseRecording();
              }}
            >
              <MCIcon
                name="stop-circle-outline"
                size={Theme.RFPercentage(6)}
                color={Theme.red}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                load();
              }}
            >
              <MCIcon
                name={play ? "play-circle-outline" : "pause-circle-outline"}
                size={Theme.RFPercentage(6)}
                color={"#00D72D"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              !play && pauseRecording();
              setIsVisibleCallback(false);
              setMarkerModelCallback(true);
            }}
          >
            <MCIcon
              name="close-circle"
              size={Theme.RFPercentage(6)}
              color={Theme.red}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PlayRecordingModal;
