import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ImageViewer from "react-native-image-zoom-viewer";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
import { db, auth, storage } from "../../Utils/Exports";
import AntDesign from "react-native-vector-icons/AntDesign";
import Theme from "../../Utils/Theme";
const Profile = ({ navigation, route }) => {
  const userData = route.params?.userData;
  const userId = auth.currentUser.uid;
  const [img, SetImg] = useState(null);
  const [totalTrips, SetTotalTrips] = useState("20");
  const [totalAttempt, SetTotalAttempt] = useState("86");
  const [showImg, setShowImg] = useState(false);
  useEffect(() => {
    const sub = SetImg(userData?.profileImg);
    return () => sub;
  }, []);
  const pickImg = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image) => {
      SetImg(image.path);
      uploadProfilePic(image.path);
    });
  };
  const uploadProfilePic = async (imgPath) => {
    try {
      const ref = storage.ref("allUser_ProfileImages").child(userId);
      await ref.putFile(imgPath);
      const url = await ref.getDownloadURL();
      updateProfilePic(url);
    } catch (error) {
      Alert.alert(error.code, error.message);
    }
  };
  const updateProfilePic = (img) => {
    try {
      db.ref("Users").child(userId).update({
        profileImg: img,
      });
    } catch (error) {
      Alert.alert(error.code, error.message);
    }
  };
  const images = [{ url: img }];

  return (
    <View style={styles.MainView}>
      <Modal visible={showImg} transparent={true}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={() => setShowImg(false)}
          onCancel={() => setShowImg(false)}
          backgroundColor={"rgba(0,0,0,0.9)"}
          renderIndicator={(currentIndex, allSize) => null}
          renderHeader={(currentIndex) => (
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowImg(false)}
            >
              <AntDesign
                name="closecircleo"
                color={Theme.white}
                size={Theme.RFPercentage(4)}
              />
            </TouchableOpacity>
          )}
        />
      </Modal>
      <Header
        label="Profile"
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.setWidth}>
        {img ? (
          <TouchableOpacity
            style={styles.wrapImg}
            onPress={() => setShowImg(true)}
          >
            <Image
              source={{
                uri: img,
              }}
              style={styles.imgProfile}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.wrapImg}>
            <Image
              source={require("../../Assets/avatar.png")}
              style={styles.imgProfile}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.editContainer}
          onPress={() => pickImg()}
        >
          {img ? (
            <Text style={styles.txtEdit}>Edit</Text>
          ) : (
            <Text style={styles.txtEdit}>Add Profile</Text>
          )}
        </TouchableOpacity>
        <View style={styles.personalDetailsContainer}>
          <Text style={styles.txtPersonalDetails}>Personal Details :</Text>

          <View style={styles.flexJustify}>
            <Text style={styles.txtEmail}>User Name</Text>
            <Text style={{ ...styles.txtEmail, fontWeight: "100" }}>
              {userData?.Name}
            </Text>
          </View>
          <View style={styles.flexJustify}>
            <Text style={styles.txtEmail}>Email</Text>

            <Text style={{ ...styles.txtEmail, fontWeight: "100" }}>
              {userData?.Email}
            </Text>
          </View>
          <View style={styles.flexJustify}>
            <Text style={styles.txtEmail}>Total Trips</Text>

            <Text style={{ ...styles.txtEmail, fontWeight: "100" }}>
              {totalTrips}
            </Text>
          </View>
          <View style={styles.flexJustify}>
            <Text style={styles.txtEmail}>Total Quiz Attempt</Text>
            <Text style={{ ...styles.txtEmail, fontWeight: "100" }}>
              {totalAttempt}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Profile;
