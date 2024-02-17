import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";
import userLogo from "../../Assets/avatar.png";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import Theme from "../../Utils/Theme";
import { db, auth } from "../../Utils/Exports";
export function DrawerContent(props) {
  const { navigation } = props;
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const onValueChange = db
      .ref(`/Users/${auth.currentUser.uid}`)
      .on("value", (snapshot) => {
        setUserData(snapshot.val());
      });
    // Stop listening for updates when no longer required
    return () =>
      db.ref(`/Users/${auth.currentUser.uid}`).off("value", onValueChange);
  }, []);
  const signOutUser = async () => {
    try {
      await auth.signOut();
      navigation.navigate("LoginScreen");
    } catch (e) {
      Alert.alert(e.code, e.message);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              {userData?.profileImg ? (
                <Avatar.Image
                  source={{ uri: userData?.profileImg }}
                  size={50}
                  style={{
                    ...Theme.shadow,
                  }}
                />
              ) : (
                <Avatar.Image
                  source={userLogo}
                  size={50}
                  style={{ ...Theme.shadow }}
                />
              )}

              <View
                style={{
                  marginLeft: Theme.wp("1.5%"),
                  flexDirection: "column",
                }}
              >
                <Title style={styles.title}>{userData?.Name}</Title>
                <Icon
                  name="close"
                  color={Theme.primary}
                  size={Theme.iconSize}
                  onPress={() => navigation.closeDrawer()}
                  style={{
                    position: "absolute",
                    right: -Theme.wp("5%"),
                    top: 0,
                  }}
                />
                <Caption style={styles.caption}>{userData?.Email}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="account-edit-outline"
                  color={Theme.primary}
                  size={size}
                />
              )}
              label="Add Place"
              labelStyle={styles.labelStyle}
              onPress={() => navigation.navigate("AddPlace")}
            />
            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="account-circle-outline"
                  color={Theme.primary}
                  size={size}
                />
              )}
              label="Profile"
              labelStyle={styles.labelStyle}
              onPress={() =>
                navigation.navigate("Profile", {
                  userData: userData,
                })
              }
            />

            {/* <DrawerItem
              icon={({ size }) => (
                <Icon name="home-outline" color={Theme.primary} size={size} />
              )}
              label="Your Trips"
              labelStyle={{ fontWeight: "700" }}
              onPress={() => navigation.navigate("YourTrip")}
            /> */}

            <DrawerItem
              icon={({ size }) => (
                <Icon
                  name="clipboard-text-outline"
                  color={Theme.primary}
                  size={size}
                />
              )}
              label="Term and Condition"
              labelStyle={styles.labelStyle}
              onPress={() => navigation.navigate("TermAndCondtion")}
            />
            <DrawerItem
              icon={({ size }) => (
                <MIcon name="support-agent" color={Theme.primary} size={size} />
              )}
              label="Support"
              labelStyle={styles.labelStyle}
              onPress={() => navigation.navigate("Support")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          style={{ justifyContent: "center" }}
          icon={({ size }) => (
            <Icon name="exit-to-app" color={Theme.red} size={size} />
          )}
          label="Logout"
          labelStyle={{ ...styles.labelStyle, color: Theme.red }}
          onPress={() => {
            signOutUser();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: { marginTop: 15 },
  bottomDrawerSection: {
    // marginBottom: 15,
    borderTopColor: Theme.lightGray,
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelStyle: {
    fontWeight: "700",
    fontSize: Theme.txtMedium,
    color: Theme.black,
  },
});
