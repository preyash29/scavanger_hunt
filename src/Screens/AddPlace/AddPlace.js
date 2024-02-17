import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import Theme from "../../Utils/Theme";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const AddPlace = ({ navigation }) => {
  const [addPost, setAddPost] = useState(false);
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: Theme.white }}>
      <View style={styles.MainView}>
        <Header
          label="Add Place Info"
          labelIcon={true}
          onPress={() => navigation.goBack()}
        />
        {addPost === false ? (
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../Assets/MapImg.jpg")}
              style={styles.imgMap}
            />
            <View style={styles.setWidth}>
              <View
                style={{
                  borderBottomWidth: 1,
                  margin: Theme.hp("1%"),
                }}
              >
                <Text style={styles.txtPostInfo}>Post Information</Text>
              </View>
              <View>
                <Text style={{ ...styles.txtAddQuiz }}>Post Name:</Text>
                <TextInput
                  placeholder="Place Name"
                  style={styles.inputTxtPlace}
                  maxLength={35}
                />
              </View>
              <View>
                <Text style={{ ...styles.txtAddQuiz }}>Post Information:</Text>

                <TextInput
                  placeholder="Post Information"
                  multiline={true}
                  style={styles.inputTxtInfo}
                />
              </View>

              <TouchableOpacity
                style={styles.btnAddPost}
                onPress={() => setAddPost(true)}
              >
                <Text style={styles.txtAddPost}>Add Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : addPost === true ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              height: Theme.hp("100%"),
              justifyContent: "space-around",
            }}
          >
            <View style={{ alignItems: Theme.align }}>
              <Image
                source={require("../../Assets/tick.jpg")}
                style={styles.imgTick}
              />
              <Text style={styles.txtPost}>Post Update Successfully</Text>
            </View>
            <View style={styles.flexJustify}>
              <TouchableOpacity
                style={styles.btnGoBack}
                onPress={() => {
                  setAddPost(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.txtGoBack}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.btnGoBack, backgroundColor: Theme.primary }}
                onPress={() => {
                  setAddPost(false);
                  navigation.navigate("AddQuiz");
                }}
              >
                <Text style={{ ...styles.txtGoBack, color: Theme.txtWhite }}>
                  Add Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default AddPlace;
