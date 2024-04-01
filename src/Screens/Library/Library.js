import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from "react-native-sound";
class Library extends Component {
  sound = null;
  constructor(props) {
    super(props);
    this.state = {
      PlayList: [],
      audioFile: "",
      recording: false,
      // loaded: false,
      paused: true,
      selectedIndex: [],
      text: false,
    };
  }
  selectItem = (index) => {
    if (this.state.selectedIndex.indexOf(index) > -1) {
      let newArray = this.state.selectedIndex.filter((indexObject) => {
        if (indexObject == index) {
          return false;
        }
        return true;
      });

      this.setState({ selectedIndex: newArray });
    } else {
      this.setState({ selectedIndex: [...this.state.selectedIndex, index] });
    }
  };
  async componentDidMount() {
    // const AllValue = JSON.parse(await AsyncStorage.getItem("@PlayList"));
    // this.setState({ PlayList: AllValue });
  }
  load = (item) => {
    return new Promise((resolve, reject) => {
      if (!item) {
        return reject("file path is empty");
      }

      this.sound = new Sound(item, "", (error) => {
        if (error) {
          console.log("failed to load the file", error);
          return reject(error);
        }
        // this.setState({ loaded: true });
        this.setState({ paused: false });
        Sound.setCategory("Playback");

        this.sound.play((success) => {
          if (success) {
            console.log("successfully finished playing");
            this.setState({ selectedIndex: [] });
          } else {
            console.log("playback failed due to audio decoding errors");
          }
          this.setState({ paused: true });
        });
        return resolve();
      });
    });
  };

  pause = (item) => {
    this.sound.pause();
    this.setState({ paused: true });
  };

  render() {
    const { PlayList } = this.state;
    return (
      <View style={styles.MainView}>
        <Header
          labelIcon={true}
          label="Library"
          onPress={() => this.props.navigation.goBack()}
        />
        {PlayList?.length > 0 ? (
          <>
            <FlatList
              data={PlayList}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.wrapContent}>
                    <View
                      style={{ ...styles.flexJustify, borderBottomWidth: 0.2 }}
                    >
                      <View style={{ width: "70%" }}>
                        <Text style={styles.txtName}>
                          {item?.audioFile?.split("\\").pop().split("/").pop()}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.selectItem(index);
                          {
                            this.state.selectedIndex.indexOf(index) > -1
                              ? this.pause()
                              : this.load(item.audioFile);
                          }
                        }}
                        disabled={!item}
                      >
                        {this.state.selectedIndex.indexOf(index) > -1 ? (
                          <Image
                            source={require("../../Assets/pauseButton.png")}
                            style={styles.imgPauseBtn}
                          />
                        ) : (
                          <Image
                            source={require("../../Assets/playButton.png")}
                            style={styles.imgPauseBtn}
                          />
                        )}

                        {/* {this.state.text == true ? <Text>test</Text> : null} */}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        ) : (
          <Text style={styles.txtNoData}>Empty Library</Text>
        )}
      </View>
    );
  }
}

export default Library;
